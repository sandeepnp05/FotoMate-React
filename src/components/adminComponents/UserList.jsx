import React from 'react';

function UserList() {
  return (
    <>
      <div className="mx-4 overflow-x-auto"> {/* Adjusted margin from ml-12 to ml-16 */}
        <table className="min-w-full bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                Product name
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Color
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Another Column
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Apple MacBook Pro 17"
              </td>
              <td className="px-6 py-4 text-left">Silver</td>
              <td className="px-6 py-4 text-left">Laptop</td>
              <td className="px-6 py-4 text-left">$2999</td>
              <td className="px-6 py-4 text-left">Another Value</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Microsoft Surface Pro
              </td>
              <td className="px-6 py-4 text-left">White</td>
              <td className="px-6 py-4 text-left">Laptop PC</td>
              <td className="px-6 py-4 text-left">$1999</td>
              <td className="px-6 py-4 text-left">Another Value</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Magic Mouse 2
              </td>
              <td className="px-6 py-4 text-left">Black</td>
              <td className="px-6 py-4 text-left">Accessories</td>
              <td className="px-6 py-4 text-left">$99</td>
              <td className="px-6 py-4 text-left">Another Value</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserList;
