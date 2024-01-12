// SingleStudio.js

import React, { useEffect, useState } from "react";
import { UserNavbar } from "./UserNavbar";
import { useParams } from "react-router-dom";
import { singleStudioDetails } from "../../api/userApi";
import { Carousel, initTE, Ripple } from "tw-elements";
import Loading from "../../components/common/Loading";
initTE({ Carousel, Ripple });
function SingleStudio() {
  const [studio, setStudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await singleStudioDetails(id);
        const studioData = res.data;
        if (studioData) {
          setStudio(studioData);
        } else {
          console.error("Invalid response structure:", res);
        }
      } catch (error) {
        console.error("Error fetching studio details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }
  return (
    <>
     
      <UserNavbar />

      <div className="container mx-auto mt-10 md:mt-20 py-2 pt-8 lg:pt-10  items-start">
        <div className="-m-1 flex flex-col lg:flex-row  md:-m-2 w-full">
          <div className="max-w-md lg:mx-5 w-full rounded-lg overflow-hidden  p-6">
            <h5 className="mb-2 text-3xl font-black leading-tight text-neutral-800 dark:text-neutral-50">
              {studio && studio.studioName}
            </h5>

            <div className="rating mb-6">
              <div className="mask mask-star-2 bg-orange-400 w-4 h-4"></div>
              <div className="mask mask-star-2 bg-orange-400 w-4 h-4"></div>
              <div className="mask mask-star-2 bg-orange-400 w-4 h-4"></div>
              <div className="mask mask-star-2 bg-orange-400 w-4 h-4"></div>
              <div className="mask mask-star-2 bg-orange-400 w-4 h-4"></div>
            </div>

            <h5 className="mb-4 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              {studio && studio.city}
            </h5>
            <div className="mb-4">
              <div className="badge badge-outline p-2">wedding</div>
              <div className="badge badge-outline p-2">general</div>
              <div className="badge badge-outline p-2">party</div>
            </div>

            <h5 className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              Total Rs:
            </h5>
            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              {studio && studio.description}
            </p>
            <button
              type="button"
              class="mb-2 block w-full rounded border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
              data-te-ripple-init
            >
              Request for Reply
            </button>
          </div>
          <div className="-m-1 flex flex-col w-full lg:flex-row md:-m-2">
            {" "}
            <div className="flex w-full md:w-1/2 flex-wrap">
              <div className="w-full px-5 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src={studio && studio.galleryImages[0]}
                />
              </div>
            </div>
            <div className="flex flex-row lg:w-1/2 lg:flex-wrap">
              <div className="w-full px-5 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src={studio && studio.galleryImages[1]}
                />
              </div>
              <div className="lg:w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src={studio && studio.galleryImages[2]}
                />
              </div>
              <div className="lg:w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src={studio && studio.galleryImages[3]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleStudio;
