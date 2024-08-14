import { useState } from 'react';

export default function CameraCapture() {
  const [image, setImage] = useState(null);

  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h1>Take a Picture</h1>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCapture}
      />
      {image && (
        <div>
          <h2>Preview:</h2>
          <img src={image} alt="Captured" style={{ width: '100%', height: 'auto' }} />
        </div>
      )}
    </div>
  );
}
