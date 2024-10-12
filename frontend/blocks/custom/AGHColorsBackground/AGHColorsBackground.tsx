'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import cx from 'classnames';
import { BlockComponent } from '~/blocks/types';
import { WordPressBlockViewer } from '~/components/WordPressBlockViewer';
import classes from './AGHColorsBackground.module.css';

const mapRange = (
    x: number,
    [fromMin, fromMax]: [fromMin: number, fromMax: number],
    [toMin, toMax]: [toMin: number, toMax: number],
) => ((x - fromMin) / (fromMax - fromMin)) * (toMax - toMin) + toMin;

const sigmoid = (x: number, w: number) => 1 / (1 + Math.exp(-x / w));

export const AGHColorsBackground: BlockComponent<
    'CustomAghColorsBackground'
> = ({ block }) => {
    const hasMouse = useMediaQuery('(pointer: fine)', true);
    const topRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    const applyTransforms = useCallback(
        (x: number, y: number, xSmoothness: number, ySmoothness: number) => {
            const rotation = mapRange(sigmoid(x, xSmoothness), [0, 1], [-1, 1]);
            const translation = mapRange(
                sigmoid(y, ySmoothness),
                [0, 1],
                [-10, 10],
            );

            if (topRef.current) {
                topRef.current.style.transform = `rotateZ(${rotation}deg) translateY(${translation}px)`;
            }

            if (bottomRef.current) {
                bottomRef.current.style.transform = `rotateZ(${rotation}deg) translateY(${translation}px)`;
            }
        },
        [],
    );

    const mouseHandler = useCallback(
        (e: MouseEvent) => {
            applyTransforms(
                e.clientX - window.innerWidth / 2,
                e.clientY - window.innerHeight / 2,
                window.innerWidth / 2,
                window.innerHeight / 2,
            );
        },
        [applyTransforms],
    );

    const tiltHandler = useCallback(
        (e: DeviceOrientationEvent) => {
            if (e.gamma !== null && e.beta !== null) {
                applyTransforms(e.beta, e.gamma, 90, 90);
            }
        },
        [applyTransforms],
    );

    useEffect(() => {
        if (hasMouse) {
            document.body.addEventListener('mousemove', mouseHandler);
        } else {
            window.addEventListener('deviceorientation', tiltHandler);
        }

        return () => {
            window.removeEventListener('deviceorientation', tiltHandler);
            document.body.removeEventListener('mousemove', mouseHandler);
        };
    }, [hasMouse, mouseHandler, tiltHandler]);

    return (
        <div className={classes.root}>
            <div
                ref={topRef}
                className={cx(classes.strip, classes.topStrip)}
            />
            <div
                ref={bottomRef}
                className={cx(classes.strip, classes.bottomStrip)}
            />
            <WordPressBlockViewer blocks={block.innerBlocks} />
        </div>
    );
};
