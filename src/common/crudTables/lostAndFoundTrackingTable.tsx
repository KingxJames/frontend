import React, { useState, useEffect, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import {
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DownloadIcon from "@mui/icons-material/Download";
import { useSelector, useDispatch } from "react-redux";
import {
  useFetchLostAndFoundTrackingQuery,
  useGenerateLostAndFoundTrackingPdfMutation,
} from "../../../store/services/lostAndFoundTrackingAPI";
import {
  setLostAndFoundTrackingState,
  selectLostAndFoundTracking,
  lostAndFoundTrackingInitialState,
  ILostAndFoundTrackingFile,
  IReturnedToOwnerSignatureFile,
  IOwnerAcknowledgementSignatureFile,
} from "../../../store/features/lostAndFoundTrackingSlice";
import { buildApiUrl } from "../../../store/config/api";
import { RootState } from "../../../store/store";

export const LostAndFoundTrackingTable: React.FC = () => {
  const dispatch = useDispatch();
  const returnedSigRef = useRef<any>(null);
  const ownerSigRef = useRef<any>(null);
  const { data: lostAndFoundTrackingData } = useFetchLostAndFoundTrackingQuery(
    {}
  );
  const [generateLostAndFoundTrackingPdf] =
    useGenerateLostAndFoundTrackingPdfMutation();

  const lostAndFoundTrackings = useSelector(selectLostAndFoundTracking);

  const paginationModel = { page: 0, pageSize: 5 };
  const [search, setSearch] = useState("");
  const [openPreview, setOpenPreview] = useState(false);
  const [previewImages, setPreviewImages] = useState<Record<string, string>>(
    {}
  );
  const token = useSelector((state: RootState) => state.auth.token);
  const [selectedLostAndFoundTracking, setSelectedLostAndFoundTracking] =
    useState<{
      id: string;
      facilityName: string;
      time: string;
      todaysDate: string;
      serialNumber: string;
      locationFound: string;
      roomNo: string;
      foundBy: string;
      itemDescription: string;
      lostAndFoundTrackingFiles: ILostAndFoundTrackingFile[];
      supervisorWhoReceivedItem: string;
      dateReturnedToOwner: string;
      timeReturnedToOwner: string;
      owner: string;
      ownerDOB: string;
      ownerAddress: string;
      ownerIDNumber: string;
      ownerTelephone: string;
      remarks: string;
      returnedToOwnerSignature: IReturnedToOwnerSignatureFile[];
      ownerAcknowledgementSignature: IOwnerAcknowledgementSignatureFile[];
      uploadedBy: string;
      formSubmitted: boolean;
    } | null>(null);

  useEffect(() => {
    if (lostAndFoundTrackingData) {
      dispatch(setLostAndFoundTrackingState(lostAndFoundTrackingData?.data));
    }
  }, [lostAndFoundTrackingData, dispatch]);

  console.log(lostAndFoundTrackingData);

  const filteredLostAndFoundTracking = (
    lostAndFoundTrackingData?.data || []
  ).filter((report: lostAndFoundTrackingInitialState) =>
    report.id?.toLowerCase().includes(search.toLowerCase())
  );

  //FETCH SIGNATURE FROM SERVER AND LOAD CANVAS FOR OWNER SIGNATURE
  // useEffect(() => {
  //   const loadReturnedSignature = async () => {
  //     const sigList = lostAndFoundTrackings.returnedToOwnerSignature;

  //     if (!sigList || !sigList.length || !returnedSigRef.current) return;

  //     const sigFile = sigList[0]; // { generated_name, url }

  //     try {
  //       const res = await fetch(
  //         buildApiUrl(
  //           `publicSafety/getFile/signatures/${sigFile.generated_name}`
  //         ),
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );

  //       if (!res.ok) return;

  //       const blob = await res.blob();
  //       const reader = new FileReader();

  //       reader.onloadend = () => {
  //         const base64 = reader.result as string;
  //         returnedSigRef.current.fromDataURL(base64);
  //       };

  //       reader.readAsDataURL(blob);
  //     } catch (err) {
  //       console.error("Failed loading signature:", err);
  //     }
  //   };

  //   loadReturnedSignature();
  // }, [lostAndFoundTrackings.returnedToOwnerSignature, token]);

  //FETCH SIGNATURE FROM SERVER AND LOAD CANVAS FOR RETURNED OWNERACKNOWLEDGEMENT SIGNATURE
  // useEffect(() => {
  //   const loadOwnerSignature = async () => {
  //     const sigList = lostAndFoundTrackings.ownerAcknowledgementSignature;

  //     if (!sigList || !sigList.length || !ownerSigRef.current) return;

  //     const sigFile = sigList[0]; // { generated_name, url }

  //     try {
  //       const res = await fetch(
  //         buildApiUrl(
  //           `publicSafety/getFile/signatures/${sigFile.generated_name}`
  //         ),
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );

  //       if (!res.ok) return;

  //       const blob = await res.blob();
  //       const reader = new FileReader();

  //       reader.onloadend = () => {
  //         const base64 = reader.result as string;
  //         ownerSigRef.current.fromDataURL(base64);
  //       };

  //       reader.readAsDataURL(blob);
  //     } catch (err) {
  //       console.error("Failed loading signature:", err);
  //     }
  //   };

  //   loadOwnerSignature();
  // }, [lostAndFoundTrackings.ownerAcknowledgementSignature, token]);

  // useEffect(() => {
  //   const loadSignature = async () => {
  //     const sig = lostAndFoundTrackings.ownerAcknowledgementSignature?.[0];
  //     if (!sig || !ownerSigRef.current) return;

  //     try {
  //       const response = await fetch(
  //         buildApiUrl(`/publicSafety/getFile/signatures/${sig.generated_name}`),
  //         { headers: { Authorization: `Bearer ${token}` } }
  //       );

  //       if (!response.ok) {
  //         console.log("Failed to fetch signature file");
  //         return;
  //       }

  //       console.log(sig.generated_name);

  //       const blob = await response.blob();
  //       const reader = new FileReader();

  //       reader.onloadend = () => {
  //         const base64 = reader.result as string;
  //         ownerSigRef.current.fromDataURL(base64);
  //       };

  //       reader.readAsDataURL(blob);
  //     } catch (err) {
  //       console.error("Error loading signature:", err);
  //     }
  //   };

  //   loadSignature();
  // }, [lostAndFoundTrackings.ownerAcknowledgementSignature, token]);

  // useEffect(() => {
  //   const loadReturnedSignature = async () => {
  //     const sig = lostAndFoundTrackings.returnedToOwnerSignature?.[0];
  //     if (!sig || !returnedSigRef.current) return;

  //     try {
  //       const response = await fetch(
  //         buildApiUrl(`publicSafety/getFile/signatures/${sig.generated_name}`),
  //         { headers: { Authorization: `Bearer ${token}` } }
  //       );

  //       if (!response.ok) {
  //         console.error("Failed to fetch signature file");
  //         return;
  //       }

  //       const blob = await response.blob();
  //       const reader = new FileReader();

  //       reader.onloadend = () => {
  //         returnedSigRef.current.fromDataURL(reader.result as string);
  //         returnedSigRef.current.off(); // Make it read-only
  //       };

  //       reader.readAsDataURL(blob);
  //     } catch (err) {
  //       console.error("Error loading signature:", err);
  //     }
  //   };

  //   loadReturnedSignature();
  // }, [lostAndFoundTrackings.returnedToOwnerSignature, token]);

  //handle download report pdf
  const handleDownloadReportPDF = async (id: string) => {
    try {
      const blob = await generateLostAndFoundTrackingPdf(id).unwrap();

      if (!(blob instanceof Blob)) {
        throw new Error("Response is not a Blob");
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `lost_and_found_tracking_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download report PDF:", error);
    }
  };

  // const handleSignaturePreview = async (
  //     lostAndFoundTracking: lostAndFoundTrackingInitialState
  //   ) => {
  //     setSelectedLostAndFoundTracking(lostAndFoundTracking);
  //     setOpenPreview(true);

  //     const urls: Record<string, string> = {};

  //     for (const file of lostAndFoundTracking.lostAndFoundTrackingFiles) {
  //       try {
  //         const response = await fetch(
  //           buildApiUrl(`publicSafety/getFile/signatures/${file.generated_name}`),
  //           {
  //             method: "GET",
  //             headers: { Authorization: `Bearer ${token}` },
  //           }
  //         );

  //         if (response.ok) {
  //           const blob = await response.blob();
  //           const blobUrl = URL.createObjectURL(blob);
  //           urls[file.generated_name] = blobUrl;
  //         }
  //       } catch (err) {
  //         console.error("Error loading image:", err);
  //       }
  //     }

  //     setPreviewImages(urls);
  //   };

  const handlePreview = async (
    lostAndFoundTracking: lostAndFoundTrackingInitialState
  ) => {
    setSelectedLostAndFoundTracking(lostAndFoundTracking);
    setOpenPreview(true);

    const urls: Record<string, string> = {};

    for (const file of lostAndFoundTracking.lostAndFoundTrackingFiles) {
      try {
        const response = await fetch(
          buildApiUrl(`publicSafety/getFile/photos/${file.generated_name}`),
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.ok) {
          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);
          urls[file.generated_name] = blobUrl;
        }
      } catch (err) {
        console.error("Error loading image:", err);
      }
    }

    // Combine both signature arrays into one
    const allSignatures = [
      ...(lostAndFoundTracking.returnedToOwnerSignature || []),
      ...(lostAndFoundTracking.ownerAcknowledgementSignature || []),
    ];

    for (const file of allSignatures) {
      try {
        const response = await fetch(
          buildApiUrl(`publicSafety/getFile/signatures/${file.generated_name}`),
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.ok) {
          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);
          urls[file.generated_name] = blobUrl;
        }
      } catch (err) {
        console.error("Error loading signature:", err);
      }
    }

    setPreviewImages(urls);
  };

  const columns: GridColDef[] = [
    { field: "facilityName", headerName: "Facility Name", flex: 1 },
    { field: "todaysDate", headerName: "Today's Date", flex: 1 },
    { field: "itemDescription", headerName: "Item Description", flex: 1 },
    { field: "locationFound", headerName: "Location Found", flex: 1 },
    { field: "foundBy", headerName: "Found By", flex: 1 },
    { field: "owner", headerName: "Owner", flex: 1 },
    { field: "ownerTelephone", headerName: "Owner Telephone", flex: 1 },
    { field: "dateReturnedToOwner", headerName: "Date Returned", flex: 1 },
    { field: "remarks", headerName: "Remarks", flex: 1 },
    {
      field: "ownerAcknowledgementSignature",
      headerName: "Owner Acknowledgement Signature",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const row = params.row as lostAndFoundTrackingInitialState;
        return (
          <Box>
            <IconButton onClick={() => handlePreview(row)} color="primary">
              <RemoveRedEyeIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDownloadReportPDF(row.id)}
              color="secondary"
            >
              <DownloadIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ padding: "3%", height: "80vh", width: "100%" }}>
      <DataGrid
        rows={filteredLostAndFoundTracking}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 15, 20]}
        disableRowSelectionOnClick
      />
      {/* preview for incident report */}
      <Dialog
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          sx={{
            mb: 2,
            color: "#5E4B8B",
            fontWeight: "bold",
            borderBottom: "2px solid #C5A645",
            pb: 1,
            textAlign: "center",
            fontSize: "1.5rem",
            width: "90%",
            margin: "auto",
          }}
        >
          Lost and Found Tracking Preview
        </DialogTitle>
        <DialogContent>
          {selectedLostAndFoundTracking && (
            <Box sx={{ flexGrow: 1, mt: 2, mb: 2 }}>
              <Grid container spacing={2} sx={{ p: "2%" }}>
                {/* Facility Name */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Facility Name"
                    fullWidth
                    value={selectedLostAndFoundTracking.facilityName}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Time */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Time"
                    fullWidth
                    value={selectedLostAndFoundTracking.time}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                {/* Date */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Today'sDate"
                    fullWidth
                    value={selectedLostAndFoundTracking.todaysDate}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                {/* Serial Number */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Serial Number"
                    fullWidth
                    value={selectedLostAndFoundTracking.serialNumber}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Location Found */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Location Found"
                    fullWidth
                    value={selectedLostAndFoundTracking.locationFound}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Room No */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Room No"
                    fullWidth
                    value={selectedLostAndFoundTracking.roomNo}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Found By */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Found By"
                    fullWidth
                    value={selectedLostAndFoundTracking.foundBy}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Supervisor Who Received Item */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Supervisor Who Received Item"
                    fullWidth
                    value={
                      selectedLostAndFoundTracking.supervisorWhoReceivedItem
                    }
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                {/* Preview Section */}
                <Grid item xs={12}>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "10px",
                      backgroundColor: "#fafafa",
                    }}
                  >
                    {selectedLostAndFoundTracking?.lostAndFoundTrackingFiles
                      ?.length ? (
                      selectedLostAndFoundTracking.lostAndFoundTrackingFiles.map(
                        (file, index) => {
                          const blobUrl = file.generated_name;

                          return blobUrl ? (
                            <img
                              key={index}
                              src={previewImages[file.generated_name]}
                              alt={file.original_name}
                              style={{
                                width: "150px",
                                height: "150px",
                                objectFit: "cover",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                                transition: "transform 0.2s ease",
                              }}
                              onMouseOver={(e) =>
                                (e.currentTarget.style.transform =
                                  "scale(1.05)")
                              }
                              onMouseOut={(e) =>
                                (e.currentTarget.style.transform = "scale(1)")
                              }
                            />
                          ) : (
                            <div
                              key={index}
                              style={{
                                width: "150px",
                                height: "150px",
                                backgroundColor: "#eee",
                                borderRadius: "8px",
                              }}
                            />
                          );
                        }
                      )
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        No photos available for this report.
                      </Typography>
                    )}
                  </div>
                </Grid>
                {/* item description */}
                <Grid item xs={12}>
                  <TextField
                    label="Item Description"
                    multiline
                    rows={4}
                    fullWidth
                    value={selectedLostAndFoundTracking.itemDescription}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                {/* Date Returned to Owner */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Date Returned to Owner"
                    fullWidth
                    value={selectedLostAndFoundTracking.dateReturnedToOwner}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Time Returned to Owner */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Time Returned to Owner"
                    fullWidth
                    value={selectedLostAndFoundTracking.timeReturnedToOwner}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Owner */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Owner"
                    fullWidth
                    value={selectedLostAndFoundTracking.owner}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Owner DOB */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Owner DOB"
                    fullWidth
                    value={selectedLostAndFoundTracking.ownerDOB}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Owner Address */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Owner Address"
                    fullWidth
                    value={selectedLostAndFoundTracking.ownerAddress}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Owner ID Number */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Owner ID Number"
                    fullWidth
                    value={selectedLostAndFoundTracking.ownerIDNumber}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Owner Telephone */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Owner Telephone"
                    fullWidth
                    value={selectedLostAndFoundTracking.ownerTelephone}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Remarks */}
                <Grid item xs={12}>
                  <TextField
                    multiline
                    rows={4}
                    label="Remarks"
                    fullWidth
                    value={selectedLostAndFoundTracking.remarks}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <label>Returned to Owner Signature</label>
                  {selectedLostAndFoundTracking?.returnedToOwnerSignature
                    ?.length ? (
                    selectedLostAndFoundTracking.returnedToOwnerSignature.map(
                      (file, index) => {
                        const blobUrl = file.generated_name;
                        console.log("-->", previewImages);

                        return blobUrl ? (
                          <img
                            key={index}
                            src={previewImages[file.generated_name]}
                            alt={file.generated_name}
                            style={{
                              width: "350px",
                              height: "150px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              border: "1px solid #ccc",
                              transition: "transform 0.2s ease",
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.transform = "scale(1.05)")
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.transform = "scale(1)")
                            }
                          />
                        ) : (
                          <div
                            key={index}
                            style={{
                              width: "350px",
                              height: "150px",
                              backgroundColor: "#eee",
                              borderRadius: "8px",
                            }}
                          />
                        );
                      }
                    )
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      No photos available for this report.
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <label>Owner Acknowledgement Signature</label>
                  {selectedLostAndFoundTracking?.ownerAcknowledgementSignature
                    ?.length ? (
                    selectedLostAndFoundTracking.ownerAcknowledgementSignature.map(
                      (file, index) => {
                        const blobUrl = file.generated_name;
                        console.log("-->", previewImages);

                        return blobUrl ? (
                          <img
                            key={index}
                            src={previewImages[file.generated_name]}
                            alt={file.generated_name}
                            style={{
                              width: "350px",
                              height: "150px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              border: "1px solid #ccc",
                              transition: "transform 0.2s ease",
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.transform = "scale(1.05)")
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.transform = "scale(1)")
                            }
                          />
                        ) : (
                          <div
                            key={index}
                            style={{
                              width: "350px",
                              height: "150px",
                              backgroundColor: "#eee",
                              borderRadius: "8px",
                            }}
                          />
                        );
                      }
                    )
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      No photos available for this report.
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenPreview(false)}
            variant="outlined"
            color="secondary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LostAndFoundTrackingTable;
