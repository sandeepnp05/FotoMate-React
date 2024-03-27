import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getChats, getUser, getVendor } from '../../api/chatApi'
import { useSelector } from 'react-redux'
import { sendMessageApi } from '../../api/messageApi'
import { UserNavbar } from './UserNavbar'

const ENDPOINT='https://fotomate-server.onrender.com'
// const ENDPOINT='https://localhost:3000'
var socket, selectedChatCompare

function Chat () {
  const [socketConnected, setSocketConnected] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const [chat, setAllChats] = useState([])
  const { id:vendorId } = useParams()
  const { user } = useSelector(state => state.userReducer)
  const id = user._id
  const scroll = useRef(null)

  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [chat]);
  

  useEffect(() => {
    socket = io(ENDPOINT);
  
    socket.on('connect', () => {
      setSocketConnected(true);
      socket.emit('setup', id);
    });
  
    socket.on('disconnect', () => {
      setSocketConnected(false);
    });
  
    socket.on('receive_message', (newMessage) => {
      setAllChats((prevChats) => [...prevChats, newMessage]);
    });
  
    return () => {
      socket.disconnect();
    };
  }, []);

  
  

  const sendMessage = async e => {
    e.preventDefault()
    let newOne
    const messsage = {
      sender: {
        id: id,
        role: 'User' // Set the role here
      },
      receiver: {
        id: vendorId,
        role: 'Studio' // Set  receiver role here
      },
      newMessage
    }
    try {
      const { data } = await sendMessageApi(messsage)
      
      newOne = data?.savedMessage
      setAllChats((prevChats)=>[...prevChats,newOne])
      socket.emit('send-message',newOne)
      setNewMessage('');
    } catch (error) {
      console.log(error.message)
    }
  }
  const handleChange = (event) => {
    setNewMessage(event.target.value);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };
  
  const { error: userError, data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(id)
  })
  const { error: studioError, data: studioData } = useQuery({
    queryKey: ['studio'],
    queryFn: () => getVendor(vendorId)
  })
  useEffect(() => {
    const getAllChats = async () => {
      try {
        if (id && vendorId) {
          const { data } = await getChats(id, vendorId)
          setAllChats(data.messages || []);
        } else {
          console.log('id or vendorId is undefined')
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    getAllChats()
  }, [id, vendorId])

  return (
    <>
      <UserNavbar/>
      <div className='flex flex-row overflow-auto'>
        {/* section 1 */}
        <div className=' fixed h-screen mt-24 w-0 md:w-1/4 md:block lg:w-1/4 bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[background-size:20px_20px]'>
          <div className='mt-20 flex justify-center'>
            <img
              src={(studioData?.data?.coverImage)||'https://tecdn.b-cdn.net/img/new/avatars/2.webp'}
              className='w-32 h-32 rounded-full'
              alt='Avatar'
            />
          </div>
          <h1 className='text-center text-white'> {studioData?.data?.studioName}</h1>
        </div>

        {/* section 2 */}
        <div>
            
        </div>
        <div className=' md:ml-72 md:pl-8 pb-24 w-full md:w-full    bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] 'ref={scroll}>
          {/* User chats  */}
          <div className= 'pt-16 md:pt-16 w-full md:w-full   bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]'>
            {chat &&
              chat?.map((message, index) => {
                const isUserMessage = message?.receiver?.role === 'User'

                return (
                  <div
                    key={index}
                    className={`mt-12 chat ${
                      isUserMessage ? 'chat-start' : 'chat-end'
                    }`}
                  >
                    <div className='chat-image avatar'>
                      <div className='w-10 rounded-full'>
                        <img
                          alt='Tailwind CSS chat bubble component'
                          src={
                            isUserMessage
                              ? studioData?.data?.coverImage ||''
                              : (userData?.data?.[0]?.profileImage || 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg')
                          }
                          
                        />
                      </div>
                    </div>
                    <div className='chat-bubble'>{message.content}</div>
                    <time className='text-xs opacity-50'>
                    { new Date(message?.createdAt).toLocaleTimeString()}
                    </time>
                    <div className='chat-header'>
                      {isUserMessage ? studioData?.data?.studioName : userData?.data?.[0]?.name}
                    </div>
                    {/* <div className='chat-footer opacity-50'>
                      {isUserMessage
                        ? 'Delivered'
                        : 'Seen at ' + message.timestamp}
                    </div> */}
                  </div>
                )
              })}
          </div>
          

          <div className='border-t-2 w-full md:w-3/4  fixed bottom-6 border-gray-200 pt-4 mb-2 sm:mb-0'>
            <div className='relative flex'>
              <input
                value={newMessage}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                type='text'
                placeholder='Write your message!'
                className='flex-grow focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3'
              />
              <div className='absolute right-0 items-center inset-y-0'>
                <button
                  onClick={sendMessage}
                  type='button'
                  className='inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none'
                >
                  <span className='font-bold'>Send</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    className='h-6 w-6 ml-2 transform rotate-90'
                  >
                    <path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z'></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat
