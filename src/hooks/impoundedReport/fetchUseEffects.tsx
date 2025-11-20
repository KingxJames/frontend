import { useEffect, useRef, useState } from "react";
import { buildApiUrl } from "../../../store/config/api";
import { useSelector } from "react-redux";
import { selectImpoundedReport } from "../../../store/features/impoundedReportSlice";

//load image from server and return the ref to be used in the component
export const getImages = () => {
  const impoundedReport = useSelector(selectImpoundedReport);
  const token = useSelector((state: any) => state.auth.token);
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchImages = async () => {
      if (!impoundedReport.impoundedReportFiles?.length) return;

      const urls: Record<string, string> = {};

      for (const file of impoundedReport.impoundedReportFiles) {
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
  }, [impoundedReport, token]);

  return imageUrls;
};

//-------------------------------------------------------------------------------------------

//load signature from server and return the ref to be used in the component
export const loadSignature = () => {
  const impoundedReport = useSelector(selectImpoundedReport);
  const signatureRef = useRef<any>(null);
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    const loadSignature = async () => {
      const sigList = impoundedReport.signature;

      if (!sigList || !sigList.length || !signatureRef.current) return;

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
          signatureRef.current.fromDataURL(base64);
        };

        reader.readAsDataURL(blob);
      } catch (err) {
        console.error("Failed loading signature:", err);
      }
    };

    loadSignature();
  }, [impoundedReport.signature, token]);

  return signatureRef; // ⬅ Must return the ref so the component can use it
};

//-------------------------------------------------------------------------------------------

//load owner signature from server and return the ref to be used in the component
export const loadOwnerSignature = () => {
  const impoundedReport = useSelector(selectImpoundedReport);
  const ownerSigRef = useRef<any>(null);
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    const loadOwnerSignature = async () => {
      const sigList = impoundedReport.ownerSignature;

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
  }, [impoundedReport.ownerSignature, token]);

  return ownerSigRef; // ⬅ Must return the ref so the component can use it
};

//-------------------------------------------------------------------------------------------

//load DPS signature from server and return the ref to be used in the component
export const loadSignaturePSD = () => {
  const impoundedReport = useSelector(selectImpoundedReport);
  const signaturePSDRef = useRef<any>(null);
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    const loadSignaturePSD = async () => {
      const sigList = impoundedReport.signaturePSD;

      if (!sigList || !sigList.length || !signaturePSDRef.current) return;

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
          signaturePSDRef.current.fromDataURL(base64);
        };

        reader.readAsDataURL(blob);
      } catch (err) {
        console.error("Failed loading signature:", err);
      }
    };

    loadSignaturePSD();
  }, [impoundedReport.signaturePSD, token]);

  return signaturePSDRef; // ⬅ Must return the ref so the component can use it
};

//-------------------------------------------------------------------------------------------

//load owner signature from server and return the ref to be used in the component
export const loadOwnerSignature2 = () => {
  const impoundedReport = useSelector(selectImpoundedReport);
  const ownerSigRef2 = useRef<any>(null);
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    const loadOwnerSignature = async () => {
      const sigList = impoundedReport.ownerSignature2;

      if (!sigList || !sigList.length || !ownerSigRef2.current) return;

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
          ownerSigRef2.current.fromDataURL(base64);
        };

        reader.readAsDataURL(blob);
      } catch (err) {
        console.error("Failed loading signature:", err);
      }
    };

    loadOwnerSignature();
  }, [impoundedReport.ownerSignature2, token]);

  return ownerSigRef2; // ⬅ Must return the ref so the component can use it
};

//-------------------------------------------------------------------------------------------

//load DPS signature from server and return the ref to be used in the component
export const loadSignaturePSD2 = () => {
  const impoundedReport = useSelector(selectImpoundedReport);
  const signaturePSDRef2 = useRef<any>(null);
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    const loadSignaturePSD = async () => {
      const sigList = impoundedReport.signaturePSD2;

      if (!sigList || !sigList.length || !signaturePSDRef2.current) return;

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
          signaturePSDRef2.current.fromDataURL(base64);
        };

        reader.readAsDataURL(blob);
      } catch (err) {
        console.error("Failed loading signature:", err);
      }
    };

    loadSignaturePSD();
  }, [impoundedReport.signaturePSD2, token]);

  return signaturePSDRef2; // ⬅ Must return the ref so the component can use it
};