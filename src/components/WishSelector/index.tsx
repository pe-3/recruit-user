import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import $bus from '../../bus';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
    {
        label: '功能再完善的系统没有一个好看的外表想必用的人也不会很多。你不仅可以再浏览器这个画板上描绘你的想象。你还可以借助node.js来搭建属于自己的平台。想成为全栈攻城狮吗？是兄弟就来acat学前端。',
        imgPath:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.softtest.com%2Fuploadfile%2F2017%2F0906%2F20170906081743772.jpg&refer=http%3A%2F%2Fwww.softtest.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662553627&t=2b3c60ab3302908bbafabbd5923c3912',
    },
    {
        label: '后台开发作为web网站建设的核心，如果说前端是用户肉眼可见的美丽衣衫，后台就是美丽背景后一系列的功能支柱，可以说没有后台，用户将无法有完整的体验。java作为 G7语言中相当重要的一位，可以说在许多大厂都占有一席之地。',
        imgPath:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fstatic.cnbetacdn.com%2Farticle%2F2020%2F0916%2F8f8ade3928af8f7.gif&refer=http%3A%2F%2Fstatic.cnbetacdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662607816&t=e82f24358d4e3f8015803ff5cbff7368',
    },
    {
        label: 'go又全名golang，是谷歌开发的一款后台开发语言，虽然golang比较与java年轻许多，但是go的潜力已经在不少大厂都体现了出来。作为新来者，go有着很大可能性跻身G7语言。',
        imgPath:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp5.itc.cn%2Fq_70%2Fimages03%2F20210221%2Fa12663f11c694a9580f2c1eaad8d6a30.gif&refer=http%3A%2F%2Fp5.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662607950&t=2401cfaf701910837fce284ac7560e74',
    },
    {
        label: '机器学习是一门多领域交叉学科，专门研究计算机怎样模拟或实现人类的学习行为，以获取新的知识或技能，重新组织已有的知识结构使之不断改善自身的性能。它是人工智能的核心，是使计算机具有智能的根本途径。',
        imgPath:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg22.aspzz.cn%2Fuploads%2Fallimg%2Fc180827%2F153535093P5960-14423.jpg&refer=http%3A%2F%2Fimg22.aspzz.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662608641&t=9c125f0958a53509f2751ea0633ce016',
    }
];

function WishSelector(props: { stop?: boolean, wish: number }) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(props.wish ? props.wish - 1 : 0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);

    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    React.useEffect(() => {
        const resetWish = () => {
            setActiveStep(props.wish > 0 ? props.wish - 1 : props.wish);
        }
        $bus.addListener('reset-wish', resetWish);
        return () => {
            $bus.removeListener('reset-wish', resetWish);
        }
    })

    return (
        <Box sx={{ maxWidth: '95%', flexGrow: 1, m: '0 auto'}}>
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        下一个
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        上一个
                    </Button>
                }
            />
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={props.stop ? undefined : handleStepChange}
                enableMouseEvents
            >
                {images.map((step, index) => (
                    <div key={step.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Box
                                component="img"
                                sx={{
                                    height: '166px',
                                    display: 'block',
                                    maxWidth: 400,
                                    overflow: 'hidden',
                                    width: '100%',
                                }}
                                src={step.imgPath}
                                alt={step.label}
                            />
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>
            <Paper
                square
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 'auto',
                    bgcolor: 'background.default',
                    m: '1rem 0',
                    p: 1,
                    pt: 0,
                    minHeight: '10rem'
                }}
            >
                <Typography>{images[activeStep].label}</Typography>
            </Paper>

        </Box>
    );
}

export default WishSelector;
