'use client'
import { createPost } from '@/actions/posts';
import { displayError } from '@/utils/displayError';
import { clearSessionStorage } from '@/utils/clearSessionStorage';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { FaImage } from "react-icons/fa6";
import { usePosts } from '@/context/PostsContext';

const PostComposer = () => {
  const pathname = usePathname();
  const initialPostType = pathname.includes('status') ? 'reply' : 'post';
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const [post, setPost] = useState({});
  const [ready, setIsReady] = useState(false);
  const [postType, setPostType] = useState(initialPostType);
  const router = useRouter();
  const { updatePost } = usePosts();

  const buttonValue = loading
    ? postType === 'post' ? 'Posting' : 'Replying'
    : postType === 'post' ? 'Post' : 'Reply';

  const textAreaPlaceholder = postType === 'post'
    ? 'Write your post'
    : 'Write your reply';

  const ref = useRef(null);
  const maxChars = 11110;


  const resize = (e) => {
    setText(e.target.value)
    ref.current.style.height = '76px';
    ref.current.style.height = ref.current.scrollHeight + 'px';
  };

  const handleImage = (e) => {
    setImage(e.target.files[0].name);
  }

  const preparePostData = (e) => {
    const postData = new FormData();
    const image = e.target.image.files[0];
    const caption = text;
    if (image) postData.append('image', image);
    postData.append('caption', caption);
    postData.append('postType', postType);
    if (postType === 'reply') postData.append('parentId', post._id);

    return postData
  }

  const resetForm = (form) => {
    setText('');
    setImage('');
    form.target.reset();
    clearSessionStorage();
  };

  const handlePost = async (e) => {
    e.preventDefault();
    const postData = preparePostData(e);
    setLoading(true);
    const { success, errorMsg, post } = await createPost(postData);

    if (success) {
      resetForm(e);
      if (pathname === '/compose/post') router.back();
      updatePost(post);
    }
    else
      displayError(errorMsg, 'createPost');
    setLoading(false)
  }

  const loadPostFromSession = () => {
    let postObj = sessionStorage.getItem('post');
    if (postObj) {
      postObj = JSON.parse(postObj);
      setPost(postObj.post);
      setPostType(postObj.type);
    }
  }

  const getPostIdFromPath = () => {
    if (pathname.includes('status')) {
      const postId = pathname.split('/')[3];
      setPostType('reply');
      setPost({ _id: postId });
    }
  }


  useEffect(() => {
    setIsReady(true);
    loadPostFromSession();
  }, [])

  useEffect(() => {
    getPostIdFromPath();
  }, [pathname])

  return (
    <form onSubmit={handlePost} className='flex flex-col overflow-y-auto max-h-80'>
      <div className='flex'>
        <div className='relative flex justify-center '>
          <Link href={'/'} className='h-fit relative mt-3'>
            <Image src={`/user.png`} className='w-10 h-10 rounded-full' width={40} height={40} alt='post' />
            <span className='absolute left-1/2 top-1/2 -translate-1/2 text-lg'>M</span>
          </Link>
        </div>
        <textarea disabled={ready ? false : true} className='w-full resize-none overflow-hidden px-2 py-4 h-19 placeholder:text-lg caret-white outline-none' name='caption' value={text} maxLength={maxChars} placeholder={textAreaPlaceholder} ref={ref} rows={1} onInput={resize} />
      </div>

      <div className='sticky bottom-0 bg-black'>
        <p className={`${text ? 'bg-white/30' : 'bg-white/0'} my-2 h-px`}></p>
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <label className='text-white cursor-pointer flex items-center justify-center text-lg hover:bg-white/20 duration-300 rounded-full w-8 h-8'>
              <span className='bg-black'><FaImage /></span>
              <input type="file" onInput={handleImage} name='image' hidden />
            </label>
            <p className='opacity-80'>{image}</p>
          </div>
          <div className='flex justify-center items-center gap-3 pb-2'>
            <input type='submit' value={buttonValue} disabled={text || loading || image ? false : true} className={`${text || loading || image ? 'bg-white text-black cursor-pointer' : 'bg-white/50 text-black/50 cursor-auto'} rounded-2xl font-bold px-5 py-1 duration-300`} />
          </div>
        </div>
      </div>
    </form>
  )
}

export default PostComposer