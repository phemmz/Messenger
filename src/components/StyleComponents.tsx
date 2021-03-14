
import styled from 'styled-components';

interface BaseStyleProps {
  margin?: string;
  padding?: string;
  color?: string;
};

interface FlexContainerProps extends BaseStyleProps {
  alignItems?: string;
  justifyContent?: string;
  margin?: string;
  padding?: string;
};

interface Typography extends BaseStyleProps {
  fontSize?: string;
  fontWeight?: string;
};

const FlexContainer = styled.div<FlexContainerProps>`
  display: flex;
  align-items: ${({ alignItems }) => alignItems || 'flex-start'};
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  margin: ${({ margin }) => margin || '0px'};
  padding: ${({ padding }) => padding || '0px'};
`;

const Text = styled.span<Typography>`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  margin: ${({ margin }) => margin || '0px'};
  color: ${({ color }) => color};
`;

const Heading = styled.h2<Typography>`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  margin: ${({ margin }) => margin || '0px'};
  padding: ${({ padding }) => padding || '0px'};
  color: ${({ color }) => color};
`;

export {
  FlexContainer,
  Text,
  Heading,
};
