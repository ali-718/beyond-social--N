import React from 'react';
import { ModalComponent } from 'src/components/ModalComponent/ModalComponent';

export const CourseModal = ({
  open,
  onClose,
  image,
  name,
  description,
  isBuyNow,
  isEdit,
  onClickBuyNow,
  onClickEdit,
}) => {
  return (
    <ModalComponent className="max-w-[700px]" open={open} onClose={onClose}>
      <img className="object-cover w-full md:h-[350px] h-[300px]" src={image} alt="" />

      <h3 className="md:text-xl font-bold text-gray-900 mt-2">
        <p>{name}</p>
      </h3>
      <p className="mt-2 mb-2">{description}</p>

      {isBuyNow && (
        <button
          onClick={onClickBuyNow}
          class="uppercase mt-2 w-full mx-auto cursor-pointer bg-yellow-400 hover:bg-yellow-500  text-black rounded-lg px-3 py-3 font-semibold"
        >
          Buy NOW
        </button>
      )}
      {isEdit && (
        <button
          onClick={onClickEdit}
          class="uppercase mt-2 w-full mx-auto cursor-pointer bg-yellow-400 hover:bg-yellow-500  text-black rounded-lg px-3 py-3 font-semibold"
        >
          Edit
        </button>
      )}
    </ModalComponent>
  );
};
