import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import '@styles/components/ImageCarousel.scss';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

interface Images {
  imageUrl: string;
}

const ImageCarousel = ({ images }: { images: Images[] }) =>{
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images?.length ?? 0;

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <div className='imageCarousel'>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          className="autoplay"
        >
          {images.map((step, index) => (
            <div key={index}>
              {Math.abs(activeStep - index) <= 2 ? (
                    <div className='image-container'>
                      <img src={step.imageUrl || undefined}></img>
                    </div>
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          variant="progress"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className='progressBar'
          sx={{ maxWidth: 400, flexGrow: 1 }}
          nextButton={
            <></>
          }
          backButton={
                        <></>

          }
        />
    </div>

  );
}

export default ImageCarousel;
