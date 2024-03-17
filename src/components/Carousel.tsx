import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import '@styles/components/Carousel.scss';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

interface Cards {
  title: string;
  desc: string;
}

const Carousel = ({ cards }: { cards: Cards[] }) =>{
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = cards.length;

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <div className='carousel'>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          className="autoplay"
        >
          {cards.map((step, index) => (
            <div key={step.title}>
              {Math.abs(activeStep - index) <= 2 ? (
                  <a className={`card`}>
                    <span className="title">{step.title}</span>
                    <span className="desc">
                      {step.desc }
                    </span>
                  </a>
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

export default Carousel;
