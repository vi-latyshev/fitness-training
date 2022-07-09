import Image from 'next/image';

import logoFitness from 'static/logo-generation.jpg';

type LogoProps = {
    width?: number;
    height?: number;
};

export const Logo = ({ width = 128, height = 127 }: LogoProps) => (
    <Image src={logoFitness} width={width} height={height} />
);
