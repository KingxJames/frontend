import { useEffect, useRef, useState } from "react";
import { buildApiUrl } from "../../../store/config/api";
import { useSelector } from "react-redux";
import { selectLostProperty } from "../../../store/features/lostPropertySlice";

//load owner signature from server and return the ref to be used in the component
export const loadOwnerSignature = () => {
  const lostProperty = useSelector(selectLostProperty);
  const ownerSigRef = useRef<any>(null);
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    const loadOwnerSignature = async () => {
      const sigList = lostProperty.ownerSignature;

      if (!sigList || !sigList.length || !ownerSigRef.current) return;

      const sigFile = sigList[0];

      try {
        const res = await fetch(
          buildApiUrl(
            `publicSafety/getFile/signatures/${sigFile.generated_name}`
          ),
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) return;

        const blob = await res.blob();
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64 = reader.result as string;
          ownerSigRef.current.fromDataURL(base64);
        };

        reader.readAsDataURL(blob);
      } catch (err) {
        console.error("Failed loading signature:", err);
      }
    };

    loadOwnerSignature();
  }, [lostProperty.ownerSignature, token]);

  return ownerSigRef; // ⬅ Must return the ref so the component can use it
};

//-------------------------------------------------------------------------------------------

//load DPS signature from server and return the ref to be used in the component
export const loadSignatureDPS = () => {
  const lostProperty = useSelector(selectLostProperty);
  const signatureDPSRef = useRef<any>(null);
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    const loadSignatureDPS = async () => {
      const sigList = lostProperty.signatureDPS;

      if (!sigList || !sigList.length || !signatureDPSRef.current) return;

      const sigFile = sigList[0]; // { generated_name, url }

      try {
        const res = await fetch(
          buildApiUrl(
            `publicSafety/getFile/signatures/${sigFile.generated_name}`
          ),
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) return;

        const blob = await res.blob();
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64 = reader.result as string;
          signatureDPSRef.current.fromDataURL(base64);
        };

        reader.readAsDataURL(blob);
      } catch (err) {
        console.error("Failed loading signature:", err);
      }
    };

    loadSignatureDPS();
  }, [lostProperty.signatureDPS, token]);

  return signatureDPSRef; // ⬅ Must return the ref so the component can use it
};

//-------------------------------------------------------------------------------------------

// load returned to owner signature from server and return the ref to be used in the component
export const loadReturnedToOwnerSignature = () => {
  const lostProperty = useSelector(selectLostProperty);
  const returnedSigRef = useRef<any>(null);
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    const loadReturnedSignature = async () => {
      const sigList = lostProperty.returnedToOwnerSignature;

      if (!sigList || !sigList.length || !returnedSigRef.current) return;

      const sigFile = sigList[0]; // { generated_name, url }

      try {
        const res = await fetch(
          buildApiUrl(
            `publicSafety/getFile/signatures/${sigFile.generated_name}`
          ),
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) return;

        const blob = await res.blob();
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64 = reader.result as string;
          returnedSigRef.current.fromDataURL(base64);
        };

        reader.readAsDataURL(blob);
      } catch (err) {
        console.error("Failed loading signature:", err);
      }
    };

    loadReturnedSignature();
  }, [lostProperty.returnedToOwnerSignature, token]);

  return returnedSigRef; // ⬅ Must return the ref so the component can use it
};

//-------------------------------------------------------------------------------------------
export const getImages = () => {
  const lostProperty = useSelector(selectLostProperty);
  const token = useSelector((state: any) => state.auth.token);
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchImages = async () => {
      if (!lostProperty.lostPropertyFiles?.length) return;

      const urls: Record<string, string> = {};

      for (const file of lostProperty.lostPropertyFiles) {
        try {
          const res = await fetch(
            buildApiUrl(`publicSafety/getFile/photos/${file.generated_name}`),
            {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (res.ok) {
            const blob = await res.blob();
            const blobUrl = URL.createObjectURL(blob);
            urls[file.generated_name] = blobUrl;
          }
        } catch (err) {
          console.error("Error fetching file:", file.generated_name, err);
        }
      }

      setImageUrls(urls);
    };

    fetchImages();
  }, [lostProperty, token]);

  return imageUrls;
};
