import { Wrap, WrapItem, Avatar } from '@chakra-ui/react';
import React from 'react';

const IMAGES = [
  {
    name: 'Shaneil Kapadia ',
    image:
      'https://media-exp1.licdn.com/dms/image/D5635AQH6oh0dL1hTrA/profile-framedphoto-shrink_400_400/0/1621882924892?e=1638144000&v=beta&t=dEi3-1160jNZjdttAkj8BouDuePmKVxQ8LJE09rTjjk',
  },
  {
    name: 'Deniz Evrendilek',
    image:
      'https://media-exp1.licdn.com/dms/image/C5603AQFScvaD10boTQ/profile-displayphoto-shrink_200_200/0/1570066541787?e=1643241600&v=beta&t=1eZWEay0-SQwLFrzWrBwG-LwW-ROA3skDZCx2dMTvqc',
  },
  {
    name: 'Zwe Min Soe',
    image:
      'https://media-exp1.licdn.com/dms/image/C4E03AQHRmi0JWdvFqA/profile-displayphoto-shrink_400_400/0/1589740212421?e=1643241600&v=beta&t=NgVGFkAqBasaOWHe1ygIiYT60u_QVy_detWSWoEFxWE',
  },
];

export default function Avatars() {
  const renderAvatars = () =>
    IMAGES.map(({ name, image }) => (
      <WrapItem>
        <Avatar name={name} src={image} />
      </WrapItem>
    ));

  return <Wrap w={'100%'}>{renderAvatars()}</Wrap>;
}
