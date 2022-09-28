import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import acat from '../../requests';
import { message } from '../../MSG';

const steps = [
    {
        label: '一面面试：基础面',
        description: `恭喜你通过了一面面试`,
    },
    {
        label: '二面面试：进阶面',
        description:
            'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
        label: '三面面试',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
];

const failsteps = [
    {
        label: '一面面试：基础面',
        description: `很遗憾，您并没有通过本轮面试。`,
    },
    {
        label: '二面面试：进阶面',
        description:
            '很遗憾，您并没有通过本轮面试。',
    },
    {
        label: '三面面试',
        description: `很遗憾，您并没有通过本轮面试。`,
    },
];

const staySteps = [
    {
        label: '一面面试：基础面',
        description: `结果待定，请不要灰心。`,
    },
    {
        label: '二面面试：进阶面',
        description:
            '结果待定，请不要灰心。',
    },
    {
        label: '三面面试',
        description: `结果待定，请不要灰心。`,
    },
]

export default function ResSteper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [curStep, setStep] = React.useState(steps);

    acat.getInterRes().then(() => {
        let { msg, code, data } = acat.getData('getInterRes');
        code && message.error(msg);
        console.log(data);
        if (data.first_isCommit === '1') {
            if (data.first_ispass === false) {
                setStep(failsteps);
            }
            if (data.first_ispass === undefined) {
                setStep(staySteps);
            }
            setActiveStep(0);
        } else if (data.first_isCommit === '0') {
            setStep(staySteps);
        }
        if (data.second_isCommit === '1') {
            if (data.second_ispass === false) {
                setStep(failsteps);
            }
            if (data.second_ispass === undefined) {
                setStep(staySteps);
            }
            setActiveStep(1);
        }
        if (data.third_isCommit === '1') {
            if (data.third_ispass === false) {
                setStep(failsteps);
            }
            if (data.third_ispass === undefined) {
                setStep(staySteps);
            }
            setActiveStep(2);
        } 
    })

    return (
        <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {curStep.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === 2 ? (
                                    <Typography variant="caption">Last step</Typography>
                                ) : null
                            }
                        >
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            <Typography>{step.description}</Typography>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}
