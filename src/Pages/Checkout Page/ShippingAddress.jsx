import { Button, Divider } from 'antd';
import { FaEdit } from 'react-icons/fa';
import { EnvironmentOutlined, CheckCircleFilled } from '@ant-design/icons';

function ShippingAddress({ setEditing, setUpdate, customer, setIsDisabled }) {
  return (
    <div>
      <h2 className="text-2xl">Shipping Address</h2>
      <div className="border border-gray-200 p-4 rounded-md">
        <div className="flex justify-between">
          <h2 className="bolder text-xl">
            Address <span>(Home)</span>
          </h2>
          <Button
            type="primary"
            onClick={() => {
              setEditing(true);
              setUpdate(true);
              setIsDisabled(true);
            }}
            icon={<FaEdit />}
          >
            Edit
          </Button>
        </div>
        <Divider className="mt-3" />
        <div className="flex gap-4 items-center">
          <div>
            <EnvironmentOutlined className="text-primary text-4xl" />
          </div>
          <div>
            <p className="text-gray-600">
              Deliver to: {customer?.firstName} {customer?.lastName}
            </p>

            <p>
              <strong>City:</strong> {customer?.address?.city}
            </p>

            <p>
              <strong>Street Address:</strong>{' '}
              {customer?.address?.streetAddress}
            </p>
            <p>
              <strong>Building Number:</strong>{' '}
              {customer?.address?.buildingNumber}
            </p>
            <p>
              <strong>Floor:</strong> {customer?.address?.floor}
            </p>
            <p>
              <strong>Apt Number:</strong> {customer?.address?.aptNumber}
            </p>

            {customer?.address?.nearestLandmark && (
              <p>
                <strong>Nearest Landmark:</strong>{' '}
                {customer?.address?.nearestLandmark}
              </p>
            )}
            <p>
              <strong>Phone Number:</strong> {customer?.phoneNumber}{' '}
              <CheckCircleFilled className="text-green-600" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingAddress;
