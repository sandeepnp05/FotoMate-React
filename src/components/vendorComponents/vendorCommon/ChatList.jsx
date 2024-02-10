// ChatList.js
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getChatList } from '../../../api/chatApi'

function ChatList({ vendorId, onUserSelect }) {
  const { error: chatListError, data: chatList } = useQuery({
    queryKey: ['chatList'],
    queryFn: () => getChatList(vendorId)
  })

  const handleUserSelect = (userId) => {
    if (onUserSelect) {
      onUserSelect(userId);
    }
  };
  console.log(chatList,'chatList')

  return (
    <div>
      <h1 className='mb-4 text-white pl-5 mt-12'>Chat list</h1>

      {chatList && chatList?.data?.map((user, index) => (
        <div key={index} className='pl-5 py-1 flex flex-row cursor-pointer' onClick={() => handleUserSelect(user?._id)}>
          <img
            className='w-8 h-8 rounded-full'
            alt='Tailwind CSS chat bubble component'
            src={user?.user?.profileImage || 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'}
          />
          <h3 className='text-white text-sm pt-2 pl-3 justify-center text-justify'>{user?.user?.name}</h3>
        </div>
      ))}
    </div>
  )
}

export default ChatList
