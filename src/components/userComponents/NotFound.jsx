import React from 'react'

function NotFound() {
  return (
//     <div className="text-center items-center justify-center">
//       <div>
//   <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
//   <p className="mb-4 text-lg text-gray-600">Oops! Looks like you're lost.</p>
//   <div className="animate-bounce">
//     <svg
//       className="mx-auto h-16 w-16 text-red-500"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//       />
//     </svg>
//   </div>
//   <p className="mt-4 text-gray-600">
//     Let's get you back{" "}
//     <a href="/" className="text-blue-500">
//       home
//     </a>
//     .
//   </p>
//   </div>
// </div>
<section className="flex items-center h-screen p-16 bg-gray-50 dark:bg-gray-700">
  <div className="container flex flex-col items-center ">
    <div className="flex flex-col gap-6 max-w-md text-center">
      <h2 className="font-extrabold text-9xl text-gray-600 dark:text-gray-100">
        <span className="sr-only">Error</span>404
      </h2>
      <p className="text-2xl md:text-3xl dark:text-gray-300">
        Sorry, we couldn't find this page.
      </p>
      <a
        href="/"
        className="px-8 py-4 text-xl font-semibold rounded bg-purple-600 text-gray-50 hover:text-gray-200"
      >
        Back to home
      </a>
    </div>
  </div>
</section>


  )
}

export default NotFound
