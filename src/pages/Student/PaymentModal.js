import React, { useState } from 'react';
import { ModalComponent } from 'src/components/ModalComponent/ModalComponent';
import './style.css';
import { useApiHook } from 'src/hooks/apiHook';
import { ENROLL_IN_COURSE } from 'src/config/Apis';
import { useDispatch, useSelector } from 'react-redux';
import { onOpenAlertAction } from 'src/redux/AlertRedux';
import { useNavigate } from 'react-router-dom';
import { STUDENT_HOME_PAGE } from 'src/utils/routeNames';
import { Button } from 'src/components/Button/Button';

export const PaymentModal = ({ open, onClose, data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [cardNumber, setCardNumber] = useState('');

  const { apiCall: apiCallToEnroll, isLoading: enrollLoading } = useApiHook({
    method: 'post',
  });

  const cc_format = (value) => {
    const v = value
      .replace(/\s+/g, '')
      .replace(/[^0-9]/gi, '')
      .substr(0, 16);
    const parts = [];

    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substr(i, 4));
    }

    return parts.length > 1 ? parts.join(' ') : value;
  };

  const makePayment = (e) => {
    e.preventDefault();
    const apiData = {
      courseId: data?.courseId,
      tutorId: data?.tutorId,
      studentId: user?.id,
    };

    apiCallToEnroll({}, ENROLL_IN_COURSE(apiData)).then(() => {
      dispatch(onOpenAlertAction({ message: 'Payment Successfull' }));
      navigate(STUDENT_HOME_PAGE);
    });
  };

  return (
    <ModalComponent open={open} onClose={onClose}>
      <div class="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 pb-10 pt-16">
        <form className="w-full" onSubmit={makePayment}>
          <div class="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700" style={{ maxWidth: 600 }}>
            <div class="w-full pt-1 pb-5">
              <div class="bg-yellow-400 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
                <i class="mdi mdi-credit-card-outline text-3xl"></i>
              </div>
            </div>
            <div class="mb-10">
              <h1 class="text-center font-bold text-xl uppercase">Secure payment info</h1>
            </div>
            <div class="mb-3 flex -mx-2">
              <div class="px-2">
                <label for="type1" class="flex items-center cursor-pointer">
                  <input
                    required
                    type="radio"
                    class="form-radio h-5 w-5 text-yellow-500"
                    name="type"
                    id="type1"
                    checked
                  />
                  <img src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png" class="h-8 ml-3" />
                </label>
              </div>
            </div>
            <div class="mb-3">
              <label class="font-bold text-sm mb-2 ml-1">Name on card</label>
              <div>
                <input
                  required
                  class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="John Smith"
                  type="text"
                />
              </div>
            </div>
            <div class="mb-3">
              <label class="font-bold text-sm mb-2 ml-1">Card number</label>
              <div>
                <input
                  required
                  class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-yellow-500 transition-colors"
                  maxlength="19"
                  name="credit-number"
                  placeholder="XXXX XXXX XXXX XXXX"
                  type="tel"
                  onChange={(e) => setCardNumber(e.target.value)}
                  value={cc_format(cardNumber)}
                  onKeyDown={(e) => {
                    const key = e.key;
                    if (!(key >= '0' && key <= '9') && key !== 'Backspace') {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
            </div>
            <div class="mb-3 -mx-2 flex items-end">
              <div class="px-2 w-1/2">
                <label class="font-bold text-sm mb-2 ml-1">Expiration date</label>
                <div>
                  <select
                    required
                    class="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-yellow-500 transition-colors cursor-pointer"
                  >
                    <option value="01">01 - January</option>
                    <option value="02">02 - February</option>
                    <option value="03">03 - March</option>
                    <option value="04">04 - April</option>
                    <option value="05">05 - May</option>
                    <option value="06">06 - June</option>
                    <option value="07">07 - July</option>
                    <option value="08">08 - August</option>
                    <option value="09">09 - September</option>
                    <option value="10">10 - October</option>
                    <option value="11">11 - November</option>
                    <option value="12">12 - December</option>
                  </select>
                </div>
              </div>
              <div class="px-2 w-1/2">
                <select
                  required
                  class="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-yellow-500 transition-colors cursor-pointer"
                >
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                </select>
              </div>
            </div>
            <div class="mb-10">
              <label class="font-bold text-sm mb-2 ml-1">Security code</label>
              <div>
                <input
                  required
                  class="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="000"
                  type="text"
                  maxLength={3}
                />
              </div>
            </div>
            <center>
              <Button
                className={'w-[200px] mt-2 bg-yellow-500 hover:bg-yellow-700'}
                type="submit"
                text={'PAY NOW'}
                isLoading={enrollLoading}
              />
            </center>
          </div>
        </form>
      </div>
    </ModalComponent>
  );
};
