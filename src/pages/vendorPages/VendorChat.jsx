
import React, { useCallback, useRef } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getChatList, getChats, getUser, getVendor } from '../../api/chatApi'
import { useSelector } from 'react-redux'
import { sendMessageApi } from '../../api/messageApi'
import VendorNavbar from '../../components/vendorComponents/vendorCommon/VendorNavbar'

const ENDPOINT = 'http://localhost:3000'
var socket, selectedChatCompare

function vendorChat () {
  const [socketConnected, setSocketConnected] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState('')
  const [chat, setAllChats] = useState([])
  const [selectedUser,setSelectedUser] = useState()
  
  const [id, setId] = useState('');

  const { id: userId } = useParams();
  useEffect(() => {
    setId(userId);
  }, [id,userId]);
          
 
  const { vendor } = useSelector(state => state.vendorReducer)
 
  const vendorId = vendor._id
  const scroll = useRef()

  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [chat])

  useEffect(() => {
    socket = io(ENDPOINT)

    socket.on('connect', () => {
      setSocketConnected(true)
      socket.emit('setup', vendorId)
      console.log('Connected to socket.io')
    })

    socket.on('disconnect', () => {
      setSocketConnected(false)
      console.log('Disconnected from socket.io')
    })

    socket.on('receive_message', newMessage => {
      setAllChats(prevChats => [...prevChats, newMessage])
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const sendMessage = async e => {
    e.preventDefault()
    let newOne
    const messsage = {
      receiver: {
        id: id,
        role: 'User' // Set the role here
      },
      sender: {
        id: vendorId,
        role: 'Studio' // Set  receiver role here
      },
      newMessage
    }
    try {
      const { data } = await sendMessageApi(messsage)
      newOne = data?.savedMessage
      socket.emit('send-message', newOne)
      setAllChats(prevChats => [...prevChats, newOne])
      setNewMessage('')
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleChange = e => {
    setNewMessage(e.target.value)
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(e)
    }
  }

 

  const { error: userError, data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(userId)
  })
   console.log(userData,'userData1')
   console.log(id,'id')

  const { error: studioError, data: studioData } = useQuery({
    queryKey: ['studio'],
    queryFn: () => getVendor(vendorId)
  })

  const { error: chatListError, data: chatList } = useQuery({
    queryKey: ['chatList'],
    queryFn: () => getChatList(vendorId)
  })



  useEffect(() => {
    const getAllChats = async () => {
      try {
        if (id && vendorId) {
          const { data } = await getChats(id, vendorId)
          setAllChats(data.messages || [])
        } else {
          console.log('id or vendorId is undefined')
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    getAllChats()
  }, [id, vendorId])




  // chat list 

  const loadChatWithUser = useCallback(async (id) => {
    try {
      const { data } = await getChats(id, vendorId);
      setAllChats(data.messages || []);
      const fetchUserData = async () => {
        try {
          const { data: user } = await getUser(id);
          setSelectedUser(user);
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchUserData();
    } catch (error) {  
      console.log(error.message);
    }
  }, [vendorId, id]);
  

  // Handler to select a user and load chat history
  const selectUser = useCallback((id) => {
    setId(id);
    loadChatWithUser(id);
  }, [setId, loadChatWithUser]);

        
  useEffect(()=>{       
    setSelectedUser(userData?.data)
  },[id])
 console.log(selectedUser &&selectedUser,'selectedUser')
 console.log(userData&&userData?.data,'userData')
  return (
    <>
      <VendorNavbar /> 
      <div className='flex flex-row overflow-auto'>
        {/* section 1 */}
        <div className=' fixed h-screen w-0 md:w-1/4  md:block lg:w-1/4 bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[background-size:20px_20px]'>
          <div className='mt-20 flex justify-center'>
            <img
              src={
               selectedUser && selectedUser?.[0]?.profileImage ||
                'https://tecdn.b-cdn.net/img/new/avatars/2.webp'
              }
              className='w-32 h-32 rounded-full'
              alt='Avatar'
            />
          </div>
          <h1 className='text-center text-white'>
            {selectedUser && selectedUser?.[0]?.name}
          </h1>
          <div>
            <h1 className='mb-4   text-white pl-5 mt-12'>Chat list</h1>

            {chatList && chatList?.data?.map((user,index )=> (
              
              <div key={index} className=' pl-5 py-1 flex flex-row cursor-pointer' onClick={() => selectUser(user.user._id)}>
                <img
                  className='w-8 h-8 rounded-full'
                  alt='Tailwind CSS chat bubble component'
                  src={ user?.user?.profileImage
                    ||'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                  }
                />{' '}
                <h3 className='text-white text-sm pt-2 pl-3 justify-center text-justify'>
                  {user?.user?.name}
                </h3>
              </div>
              
            ))}


          </div>
        </div>

        {/* section 2 */}
        <div></div>
        <div
          className=' md:pl-72 pb-24 w-full md:w-full    bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] '
          ref={scroll}
        >
          {/* User chats  */}
          <div className='w-full md:w-full md:p-6  bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]'>
            {chat &&
              chat?.map((message, index) => {
                const isUserMessage = message?.receiver?.role === 'User'

                return (
                  <div
                    key={index}
                    className={`mt-12 chat ${
                      isUserMessage ? 'chat-end' : 'chat-start'
                    }`}
                  >
                    <div className='chat-image avatar'>
                      <div className='w-10 rounded-full'>
                        <img
                          alt='Tailwind CSS chat bubble component'
                          src={
                            isUserMessage
                              ? studioData?.data?.coverImage || ''
                              : selectedUser?.[0]?.profileImage ||
                                'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                          }
                        />
                      </div>
                    </div>
                    <div className='chat-bubble'>{message.content}</div>
                    <time className='text-xs opacity-70 pl-2'>
                      {new Date(message?.createdAt).toLocaleTimeString()}
                    </time>
                    <div className='chat-header'>
                      {isUserMessage
                        && studioData?.data?.studioName
                        // : userData?.data?.[0]?.name
                        }
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

          <div className='border-t-2 w-full md:w-3/4  fixed bottom-6 border-gray-200 px-4 pt-4 mb-2 sm:mb-0'>
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
export default vendorChat;