import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import {
  Button,
  Field,
  Input,
  Label,
  Radio,
  toast,
} from '../../components/import';
import { Dropdown } from '../../components/Dropdown';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import slugify from 'slugify';
import { metadata, postStatus } from '../../utils/constant';
import ImagesUpload from '../../components/upload/ImagesUpload';

const options = ['Knowledge', 'Nature', 'Developer', 'Tester'];
const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
  const [imageData, setImageData] = useState({
    imagePath: '',
    progressBar: 0,
  });

  useEffect(() => {
    document.title = 'New Post';
  }, []);

  const { control, watch, setValue, handleSubmit, getValues } = useForm({
    defaultValues: {
      title: '',
      slug: '',
      status: 'pending',
      category: '',
    },
  });

  const watchStatus = watch('status');
  // eslint-disable-next-line no-unused-vars
  const watchCategory = watch('category');
  const storage = getStorage();

  const addPost = async (values) => {
    const newValues = { ...values };
    newValues.slug = slugify(values.slug || values.title);
    newValues.status = values.status;
    toast.success('Add post sucessfully');
  };

  const handleUploadImages = (image) => {
    const storageRef = ref(storage, 'images/' + image.name);
    const uploadTask = uploadBytesResumable(storageRef, image, metadata);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageData({ ...imageData, progressBar: progress });
        switch (snapshot.state) {
          case 'paused':
            break;
          case 'running':
            break;
        }
      },
      () => {
        toast.error('Something is broken');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageData({ ...imageData, imagePath: downloadURL });
        });
      }
    );
  };

  const onSelectImages = (e) => {
    const image = e.target.files[0];
    if (!image) {
      toast.warn('Please select a file');
      return;
    }
    handleUploadImages(image);
    setValue('images', image.name);
  };

  const handleDeleteImg = () => {
    // Create a reference to the file to delete
    const imageRef = ref(storage, `images/${getValues('images')}`);

    // Delete the file
    deleteObject(imageRef)
      .then(() => {
        toast.success('Delete file successfully');
        setImageData({ ...imageData, imagePath: '' });
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <PostAddNewStyles>
      <h1 className='dashboard-heading'>Add new post</h1>
      <form onSubmit={handleSubmit(addPost)}>
        <div className='grid grid-cols-2 gap-x-10 mb-10'>
          <Field>
            <Label>Title</Label>
            <Input
              className='max-w-[500px]'
              control={control}
              placeholder='Enter your title'
              name='title'
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              className='max-w-[500px]'
              control={control}
              placeholder='Enter your slug'
              name='slug'
            ></Input>
          </Field>
        </div>
        <div className='grid grid-cols-2 gap-x-10 mb-10'>
          <Field>
            <Label>Status</Label>
            <div className='flex items-center gap-x-5'>
              <Radio
                name='status'
                control={control}
                checked={watchStatus === postStatus.APPROVED}
                onClick={() => setValue('status', postStatus.APPROVED)}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name='status'
                control={control}
                checked={watchStatus === postStatus.PENDING}
                onClick={() => setValue('status', postStatus.PENDING)}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name='status'
                control={control}
                checked={watchStatus === postStatus.REJECT}
                onClick={() => setValue('status', postStatus.REJECT)}
                value={postStatus.REJECT}
              >
                Reject
              </Radio>
            </div>
          </Field>

          <Field>
            <Label>Author</Label>
            <Input
              className='max-w-[500px]'
              name='author'
              control={control}
              placeholder='Find the author'
            ></Input>
          </Field>
        </div>
        <div className='grid grid-cols-2 gap-x-10 mb-10'>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              {options.length > 0 &&
                options.map((option) => (
                  <Dropdown.Option key={uuidv4()}>{option}</Dropdown.Option>
                ))}
            </Dropdown>
          </Field>
          <Field>
            <Label>Thumbail</Label>
            <ImagesUpload
              name='images'
              onChange={onSelectImages}
              progress={imageData.progressBar}
              image={imageData.imagePath}
              handleDeleteImg={handleDeleteImg}
            ></ImagesUpload>
          </Field>
        </div>
        <Button type='submit' className='mx-auto'>
          Add Post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
