# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
# UBPublicSafetyAdmindashboard
# frontend



{/* <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: "900px",
            p: 4,
            borderRadius: "12px",
            backgroundColor: "#fff",
            border: "2px solid #C5A645", // Gold border
          }}
        > */}
          {/* Section: Details */}
          {/* <Typography
            variant="h6"
            sx={{
              mb: 2,
              color: "#5E4B8B",
              fontWeight: "bold",
              borderBottom: "2px solid #C5A645",
              pb: 1,
            }}
          >
            Incident Details - {incidentReports.caseNumber}
          </Typography> */}
          {/* <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                onChange={(e) => dispatch(setDate(e.target.value))}
                value={incidentReports.date}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Time"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={incidentReports.time}
                onChange={(e) => dispatch(setTime(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="building-location-label">
                  Building Name
                </InputLabel>
                <Select
                  labelId="building-location-label"
                  label="Building Location"
                  value={incidentReports.buildingName}
                  onChange={(e) => dispatch(setBuildingName(e.target.value))}
                >
                  {buildings?.data?.buildings?.map((building: IBuilding) => (
                    <MenuItem key={building.id} value={building.name}>
                      {building.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid> */}

            {/* <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="building-location-label">Campus</InputLabel>
                <Select
                  labelId="building-location-label"
                  label="Campus"
                  value={incidentReports.campus}
                  onChange={(e) => dispatch(setCampus(e.target.value))}
                >
                  {campus?.data?.campus?.map((campus: ICampus) => (
                    <MenuItem key={campus.id} value={campus.campus}>
                      {campus.campus}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="incident-type-label">Incident Type</InputLabel>
                <Select
                  labelId="incident-type-label"
                  label="Incident Type"
                  value={incidentReports.incidentType}
                  onChange={(e) => dispatch(setIncidentType(e.target.value))}
                >
                  {incidentTypes?.data?.incidentTypes.map(
                    (type: IIncidentType) => (
                      <MenuItem key={type.id} value={type.type}>
                        {type.type}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="incident-status-label">
                  Incident Status
                </InputLabel>
                <Select
                  labelId="incident-status-label"
                  label="Incident Status"
                  value={incidentReports.incidentReportStatus}
                  onChange={(e) =>
                    dispatch(setIncidentReportStatus(e.target.value))
                  }
                >
                  {incidentStatus.data?.map((status: IIncidentStatus) => (
                    <MenuItem key={status.id} value={status.incidentStatus}>
                      {status.incidentStatus}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description of Incident"
                type="text"
                multiline
                rows={4}
                value={incidentReports.description}
                onChange={(e) => dispatch(setDescription(e.target.value))}
                fullWidth
              />
            </Grid> */}

            {/* <Grid item xs={12}>
              <TextField
                label="Action Taken"
                multiline
                rows={4}
                value={incidentReports.action}
                onChange={(e) => dispatch(setAction(e.target.value))}
                fullWidth
              ></TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <Button
                component="label"
                role={undefined}
                // tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{
                  bgcolor: "#6C3777;",
                  color: "#fff",
                  fontWeight: "bold",
                  "&:hover": {
                    bgcolor: "#6d54a3ff",
                  },
                }}
              >
                Upload files
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
            </Grid> */}

            {/* Preview Section */}
            {/* <Grid item xs={12}>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {previews.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`preview-${index}`}
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ))}
              </div>
            </Grid>
          </Grid> */}

          {/* Section: People Involved */}
          {/* <Typography
            variant="h6"
            sx={{
              mt: 4,
              mb: 2,
              color: "#5E4B8B",
              fontWeight: "bold",
              borderBottom: "2px solid #C5A645",
              pb: 1,
            }}
          >
            People Involved
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Reported By"
                fullWidth
                value={incidentReports.reportedBy}
                onChange={(e) => dispatch(setReportedBy(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Contact"
                fullWidth
                value={incidentReports.contact}
                onChange={(e) => dispatch(setContact(e.target.value))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Witnesses"
                fullWidth
                value={incidentReports.witnesses}
                onChange={(e) => dispatch(setWitnesses(e.target.value))}
              />
            </Grid>
          </Grid> */}

          {/* Actions */}
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 4,
            }}
          >
            <Button
              variant="contained"
              sx={{
                bgcolor: "#6C3777;",
                color: "#fff",
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: "#6d54a3ff",
                },
              }}
              onClick={handleSubmit}
            >
              Submit Report
            </Button>
          </Box> */}
        {/* </Paper> */}