import styled from 'styled-components';

const CelestialObject = styled.div`
  height: 250px;
  width: 250px;
  border-radius: 100%;
  padding: 20px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${props => props.theme.celestialObjectColor};
  border: 10px solid ${props => props.theme.celestialObjectBorderColor};

  &:hover {
    border: 20px solid ${props => props.theme.celestialObjectBorderColor};
  }
`;

export default CelestialObject;
