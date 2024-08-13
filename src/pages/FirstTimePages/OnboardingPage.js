import React, { useState } from 'react';
import { Button } from 'src/components/Button/Button';
import onb1 from 'src/assets/images/onboarding_1.png';
import onb2 from 'src/assets/images/onboarding_2.png';
import onb3 from 'src/assets/images/onboarding_3.png';
import { updateDocument, useUpdateDocument } from 'src/Firebase Functions/UpdateDocument';
import { retrieveUser } from 'src/hooks/AuthHooks/AuthHooks';
import { useNavigate } from 'react-router-dom';
import { POST_LIST_PAGE } from 'src/utils/routeNames';

const slides = [
  {
    image: onb1,
    heading: 'Welcome to Beyond Social',
    paragraph:
      'Dive into a new era of social media where influencers effortlessly sell and engage with their audience.',
  },
  {
    image: onb2,
    heading: 'Empower Your Influence',
    paragraph: 'Unlock the power to sell products and engage your audience like never before on Beyond Social.',
  },
  {
    image: onb3,
    heading: 'Engage & Sell with Beyond Social',
    paragraph:
      'Start your journey on a platform where influencers thrive by connecting with their audience and selling products effortlessly.',
  },
];

export const OnboardingPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const localUser = retrieveUser();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // Handle the end of the onboarding, maybe redirect to login or main app
      updateDocument({
        id: localUser?.id,
        collectionName: 'users',
        updatedData: { isFirstTime: false },
      }).then(() => {
        navigate(POST_LIST_PAGE);
      });
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-white overflow-hidden">
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="flex-shrink-0 w-full flex flex-col items-center justify-center">
              <img src={slide.image} alt="Onboarding" className="mb-6 w-full max-w-md" />
              <h2 className="mb-4 text-2xl font-bold text-center">{slide.heading}</h2>
              <p className="text-center">{slide.paragraph}</p>
            </div>
          ))}
        </div>
      </div>
      <Button text={currentSlide === 2 ? 'Finish' : 'Next'} handleSubmit={handleNext} className="mt-4" />
    </div>
  );
};
