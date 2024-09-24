import { Field, Form, Formik } from 'formik';
import { Button } from 'antd';
import { FaExclamationCircle } from 'react-icons/fa';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import * as Yup from 'yup';

function AddressForm({ address, setEditing, update }) {
  const checkoutSchema = Yup.object().shape({
    city: Yup.string().required('Required'),
    streetAddress: Yup.string().required('Required'),
    buildingNumber: Yup.string().required('Required'),
    floor: Yup.string().required('Required'),
    aptNumber: Yup.string().required('Required'),
  });
  const onSubmit = async (values, action) => {
    const washingtonRef = doc(db, 'Customers', `${auth.currentUser.uid}`);
    await updateDoc(washingtonRef, {
      address: {
        city: values.city,
        streetAddress: values.streetAddress,
        buildingNumber: values.buildingNumber,
        floor: values.floor,
        aptNumber: values.aptNumber,
        nearestLandmark: values.nearestLandmark ?? '',
      },
    });
    setEditing(false);
    action.resetForm();
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-4xl font-semibold text-center text-primary mb-6">
        {update
          ? 'Update Your Shipping Address'
          : 'Enter a new shipping address'}
      </h2>
      <Formik
        initialValues={
          address || {
            city: '',
            streetAddress: '',
            buildingNumber: '',
            floor: '',
            aptNumber: '',
            nearestLandmark: '',
          }
        }
        validationSchema={checkoutSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <Field
                type="text"
                id="city"
                name="city"
                placeholder="City"
                className={`block w-full p-2 rounded-md border ${
                  errors.city && touched.city
                    ? 'border-red-500'
                    : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-primary`}
              />
              {errors.city && touched.city && (
                <div className="flex items-center text-red-500 text-sm mt-1">
                  <FaExclamationCircle className="mr-1" />
                  {errors.city}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="streetAddress"
                className="block text-sm font-medium text-gray-700"
              >
                Street Address
              </label>
              <Field
                type="text"
                id="streetAddress"
                name="streetAddress"
                placeholder="Street Address"
                className={`block w-full p-2 rounded-md border ${
                  errors.streetAddress && touched.streetAddress
                    ? 'border-red-500'
                    : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-primary`}
              />
              {errors.streetAddress && touched.streetAddress && (
                <div className="flex items-center text-red-500 text-sm mt-1">
                  <FaExclamationCircle className="mr-1" />
                  {errors.streetAddress}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="buildingNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Building Number
              </label>
              <Field
                id="buildingNumber"
                type="text"
                name="buildingNumber"
                placeholder="Building Number"
                className={`block w-full p-2 rounded-md border ${
                  errors.buildingNumber && touched.buildingNumber
                    ? 'border-red-500'
                    : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-primary`}
              />
              {errors.buildingNumber && touched.buildingNumber && (
                <div className="flex items-center text-red-500 text-sm mt-1">
                  <FaExclamationCircle className="mr-1" />
                  {errors.buildingNumber}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="floor"
                className="block text-sm font-medium text-gray-700"
              >
                Floor
              </label>
              <Field
                type="text"
                id="floor"
                name="floor"
                placeholder="Floor"
                className={`block w-full p-2 rounded-md border ${
                  errors.floor && touched.floor
                    ? 'border-red-500'
                    : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-primary`}
              />
              {errors.floor && touched.floor && (
                <div className="flex items-center text-red-500 text-sm mt-1">
                  <FaExclamationCircle className="mr-1" />
                  {errors.floor}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="aptNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Apt Number
              </label>
              <Field
                id="aptNumber"
                type="text"
                name="aptNumber"
                placeholder="Apt Number"
                className={`block w-full p-2 rounded-md border ${
                  errors.aptNumber && touched.aptNumber
                    ? 'border-red-500'
                    : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-primary`}
              />
              {errors.aptNumber && touched.aptNumber && (
                <div className="flex items-center text-red-500 text-sm mt-1">
                  <FaExclamationCircle className="mr-1" />
                  {errors.aptNumber}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="nearestLandmark"
                className="block text-sm font-medium text-gray-700"
              >
                Nearest Landmark (Optional)
              </label>
              <Field
                type="text"
                id="nearestLandmark"
                name="nearestLandmark"
                placeholder="Nearest Landmark"
                className="block w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <Button type="primary" htmlType="submit" className="w-full mt-4">
              {update ? 'Update Address' : 'Add Address'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddressForm;
