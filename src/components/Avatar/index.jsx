import React, { useEffect, useState } from "react";
import PT from "prop-types";
import UserDefaulIcon from "assets/icons/ico-user-default.svg";

import "./styles.scss";

const Avatar = ({ photoURL }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (photoURL) {
      setImageUrl(photoURL);
    }
  }, [photoURL]);

  return (
    <div>
      {imageUrl ? (
        <img
          src={imageUrl}
          onError={() => setImageUrl(null)}
          styleName="profile-circle"
          alt="Member Portait"
        />
      ) : (
        <UserDefaulIcon />
      )}
    </div>
  );
};

Avatar.defaultProps = {
  photoURL: null,
};

Avatar.propTypes = {
  photoURL: PT.oneOf(PT.string, null),
};

export default Avatar;
