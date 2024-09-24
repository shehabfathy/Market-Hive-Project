import { Carousel } from 'antd';
import eCommerceStorySet from '../../assets/ecommerce.svg';
import marketStorySet from '../../assets/markets.svg';
import deliveryStorySet from '../../assets/delivery.svg';

export default function Header() {
  return (
    <div>
      {' '}
      <Carousel arrows className="bg-primary paddingX py-10">
        <CarouselSlide
          title={'A miscellaneous shopping experience.'}
          subtitle={
            'Enjoy a unique and varied shopping experience across our range of online stores, catering to all your miscellaneous needs.'
          }
          img={eCommerceStorySet}
        />
        <CarouselSlide
          title={'Variety of online stores and categories.'}
          subtitle={
            'Discover a diverse range of online stores under one roof, offering a wide selection of categories to meet all your shopping needs!'
          }
          imgWidth={550}
          img={marketStorySet}
        />
        <CarouselSlide
          title={'Fast delivery.'}
          subtitle={
            'Experience the joy of fast and reliable delivery with our ecommerce store, ensuring your favorite products arrive at your doorstep in no time!'
          }
          img={deliveryStorySet}
        />
      </Carousel>
    </div>
  );
}

const CarouselSlide = ({ title, subtitle, img, imgWidth = 350 }) => {
  return (
    <div className=" outline-none">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="slide-content flex flex-col gap-2 justify-center text-slate-950 text-center md:text-start order-last md:order-first">
          <h1 className="text-4xl md:text-6xl font-bold font-nunito">
            {title}
          </h1>
          <p className="text-lg">{subtitle}</p>
        </div>
        <div className="slide-img">
          <img
            src={img}
            style={{ width: imgWidth }}
            className="my-auto mx-auto"
            alt="ecommerce storyset"
          />
        </div>
      </div>
    </div>
  );
};
