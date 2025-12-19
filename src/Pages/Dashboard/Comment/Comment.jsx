import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { useAuth } from '../../../Hooks/useAuth';

const Comment = () => {
    const {user} = useAuth()
    const {register, handleSubmit, formState: { errors }} = useForm()
    const axiosSecure = useAxiosSecure()
    const {_id} = useParams()

    const {data: lessonUserData}= useQuery({
        queryKey: ['lessonUserData', _id],
        queryFn: async()=>{
            const res= await axiosSecure.get(`/lessons/${_id}`)
            console.log('lessonuserdata',res.data)
            return res.data
        }
    })


    const { data: comments = [], refetch } = useQuery({
  queryKey: ['comments', _id],
  queryFn: async () => {
    const res = await axiosSecure.get(`/comments?lessonId=${_id}`);
    return res.data;
  }
});

    const handleAddLesson =(data)=>{

        const commentData = {...data, commenterEmail: user?.email, commenterName: user?.displayName, photo: user?.photoURL, commentLessonId: lessonUserData._id, commentTime: new Date()  }

        axiosSecure.post('/comment', commentData)
        .then(res => {
            console.log('Lesson added', res.data);
            refetch()
        })
    }

    return (
        <div className='mt-10'>
            <form onSubmit={handleSubmit(handleAddLesson)}>
          <textarea rows='6' cols='50' type="text" {...register('comment',{required: true})} className="border text-lg p-2 border-gray-400 w-full rounded-lg" placeholder="Type your message here" />
          {
                errors.accessLevel && <span className="text-red-500">Comment Empty</span>
            }

   <button className="btn text-white mt-4 bg-gradient-to-r from-primary to-secondary">Comment</button>

            </form>

            {/* show comment */}

           <div className="mt-10 space-y-4">
  {comments.map((comment) => (
    <div  className="flex gap-4 p-4 border rounded-lg bg-base-100 shadow">
      <img src={comment.photo} alt="" className="w-12 h-12 rounded-full object-cover"/>
      <div>
<h4 className="font-semibold">{comment.commenterName}</h4>
 <p className="text-sm text-gray-600">{comment.commentTime}</p>
        <p className="mt-2">{comment.comment}</p>
      </div>
    </div>
  ))}
</div>

            
          
        </div>
    );
};

export default Comment;