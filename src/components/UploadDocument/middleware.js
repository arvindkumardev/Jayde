import useAxios from 'axios-hooks';
import { IMAGE_UPLOAD } from '../../utils/urls';

const uploadImage = () => {
  return useAxios(
    {
      url: IMAGE_UPLOAD,
      method: 'POST',
      config: {
        headers: {
            "Accept": "application/json",
            "content-Type": "multipart/form-data"
        }
      }
    },
    { manual: true }
  );
};

export { uploadImage };
