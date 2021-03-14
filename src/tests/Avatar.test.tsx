import { render } from '@testing-library/react';

import Avatar from '../components/Avatar';
import { chatData } from '../helpers/dummyData';

test('renders img element', () => {
  const { getByTestId } = render(
    <Avatar
      name={chatData[0].name}
      src={chatData[0].src}
    />
  );
  const imgElement = getByTestId('avatar-img');

  expect(imgElement).toBeInTheDocument();
});

test('renders initials if img not present', () => {
  const { getByTestId } = render(
    <Avatar
      name={chatData[0].name}
    />
  );
  const initialElement = getByTestId('avatar-initial');
  const splittedName = chatData[0].name.split(' ');
  const initial = `${splittedName[0][0]}${splittedName[1][0]}`;

  expect(initialElement).toBeInTheDocument();
  expect(initialElement).toHaveTextContent(initial);
});

