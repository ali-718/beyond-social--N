import React, { useEffect } from 'react';
import { useState } from 'react';
import { FETCH_LIST_OF_COURSES } from 'src/config/Apis';
import { useApiHook } from 'src/hooks/apiHook';
import { CourseModal } from 'src/pages/Student/CourseModal';
import { PaymentModal } from 'src/pages/Student/PaymentModal';
import { EditCourseModal } from 'src/pages/Teacher/EditCourseModal';

export const HomeCourses = () => {
  const {
    apiCall: apiCallForCourses,
    data = [],
    isLoading: ongoingShiftLoading,
  } = useApiHook({
    call: FETCH_LIST_OF_COURSES,
  });

  useEffect(() => {
    apiCallForCourses();
  }, []);

  return (
    <section id="courses" className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Our Courses</h2>
          <p className="mt-4 text-base font-normal leading-7 text-gray-600">
            We have the best courses to make you successfull
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4">
          {data?.map((item, i) => (
            <CourseCard tutorName={item?.tutor?.Name} name={item?.Name} image={item?.Image} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export const CourseCard = ({ description, name, isEdit, image, isBuyNow, courseId, tutorId, refetchCourses }) => {
  const [open, setOpen] = useState(false);
  const [isEditCourse, setIsEditCourse] = useState(false);
  const [openCourseModal, setOpenCourseModal] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    handleCloseCourse();
  };

  const handleClose = () => setOpen(false);

  const handleOpenEdit = () => {
    setIsEditCourse(true);
    handleCloseCourse();
  };
  const handleCloseEdit = () => setIsEditCourse(false);

  const handleOpenCourse = () => setOpenCourseModal(true);
  const handleCloseCourse = () => setOpenCourseModal(false);

  return (
    <div className="flex flex-col">
      <div onClick={handleOpenCourse} className="relative group cursor-pointer">
        <div className="overflow-hidden aspect-w-1 aspect-h-1">
          <img
            className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
            src={image}
            alt=""
          />
        </div>
        <div className="flex items-start justify-between mt-4 space-x-4">
          <div>
            <h3 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
              <p>
                {name}
                <span className="absolute inset-0" aria-hidden="true"></span>
              </p>
            </h3>
            {/* <span className="text-gray-400">{tutorName}</span> */}
          </div>
        </div>
      </div>
      {isBuyNow && (
        <button
          onClick={handleOpen}
          class="uppercase mt-2 w-full mx-auto cursor-pointer bg-yellow-400 hover:bg-yellow-500  text-black rounded-lg px-3 py-3 font-semibold"
        >
          Buy NOW
        </button>
      )}
      {isEdit && (
        <button
          onClick={handleOpenEdit}
          class="uppercase mt-2 w-full mx-auto cursor-pointer bg-yellow-400 hover:bg-yellow-500  text-black rounded-lg px-3 py-3 font-semibold"
        >
          Edit
        </button>
      )}

      <PaymentModal
        data={{
          courseId,
          tutorId,
        }}
        onClose={handleClose}
        open={open}
      />

      <EditCourseModal
        data={{
          id: courseId,
          Name: name,
          Description: description,
          image: image,
        }}
        refetchCourses={refetchCourses}
        open={isEditCourse}
        onClose={handleCloseEdit}
      />
      <CourseModal
        image={image}
        name={name}
        description={description}
        isBuyNow={isBuyNow}
        isEdit={isEdit}
        onClickBuyNow={handleOpen}
        onClickEdit={handleOpenEdit}
        onClose={handleCloseCourse}
        open={openCourseModal}
      />
    </div>
  );
};
