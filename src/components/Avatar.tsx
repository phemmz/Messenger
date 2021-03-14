import styled from 'styled-components';

import { Text } from './StyleComponents';
import { colors } from '../helpers/colors';

interface AvatarProps {
  name: string;
  src?: string;
  size?: number;
};

interface ContainerProps {
  size?: number;
  hasSrc: boolean;
};

const Container = styled.div<ContainerProps>`
  display: flex;
  width: ${({ size }) => size ? `${size}px` : '2.5rem'};
  height: ${({ size }) => size ? `${size}px` : '2.5rem'};
  align-items: center;
  justify-content: center;
  border-radius: 1.25rem;
  border-radius: ${({ size }) => size ? `${size / 2}px` : '1.25rem'};
  background-color: ${({ hasSrc }) => hasSrc ? colors.gray_200 : colors.primary_100};
`;

const Image = styled.img`
  width: ${({ size }: { size?: number }) => size ? `${size}px` : '2.5rem'};
  height: ${({ size }: { size?: number }) => size ? `${size}px` : '2.5rem'};
  border-radius: ${({ size }: { size?: number }) => size ? `${size / 2}px` : '1.25rem'};
`;


function Avatar({ name, src, size }: AvatarProps): JSX.Element {
  const splittedName = name.split(' ');
  const initial = `${splittedName[0][0]}${splittedName[1][0]}`;

  return (
    <Container size={size} hasSrc={!!src}>
      {src ? (
        <Image size={size} src={src} alt={name} data-testid="avatar-img" />
      ) : (
        <Text fontSize="0.8rem" color="#fff" data-testid="avatar-initial">{initial}</Text>
      )}
    </Container>
  );
}

export default Avatar;
