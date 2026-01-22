"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function AnimatedSection({
    children,
    className = '',
    delay = 0,
    direction = 'up',
    duration = 0.6,
    once = true
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: '-50px' });

    const variants = {
        up: {
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 }
        },
        down: {
            hidden: { opacity: 0, y: -40 },
            visible: { opacity: 1, y: 0 }
        },
        left: {
            hidden: { opacity: 0, x: -40 },
            visible: { opacity: 1, x: 0 }
        },
        right: {
            hidden: { opacity: 0, x: 40 },
            visible: { opacity: 1, x: 0 }
        },
        scale: {
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1 }
        },
        fade: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
        }
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={variants[direction]}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1]
            }}
        >
            {children}
        </motion.div>
    );
}

export function StaggerChildren({
    children,
    className = '',
    staggerDelay = 0.1,
    once = true
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
                visible: {
                    transition: {
                        staggerChildren: staggerDelay
                    }
                }
            }}
        >
            {React.Children.map(children, (child) => (
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                    {child}
                </motion.div>
            ))}
        </motion.div>
    );
}

export function TextReveal({ text, className = '', delay = 0 }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const words = text.split(' ');

    return (
        <span ref={ref} className={className}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{
                        duration: 0.4,
                        delay: delay + i * 0.05,
                        ease: 'easeOut'
                    }}
                >
                    {word}&nbsp;
                </motion.span>
            ))}
        </span>
    );
}

export function FloatingElement({
    children,
    className = '',
    duration = 4,
    distance = 15
}) {
    return (
        <motion.div
            className={className}
            animate={{
                y: [-distance, distance, -distance]
            }}
            transition={{
                duration,
                repeat: Infinity,
                ease: 'easeInOut'
            }}
        >
            {children}
        </motion.div>
    );
}
