export const getReportingPermissions = () => {
  const role = localStorage.getItem("REPORTING_ROLE");
  let permissions;
  switch (role) {
    case "REPORTING_ADMIN":
      permissions = {
        assignKamTab: { visibilty: true },
        corpAdminTab: { visibilty: true },
        bulkUploadTab: { visibilty: true },
        addPackage: { visibilty: true },
        managePermissionsTab: { visibilty: true },
        masterDataTab: { visibilty: true },
        createReportTab: {
          visibilty: true,
          createReportBtn: { visibilty: true },
          childTab: {
            form32Tab: { visibilty: true },
            form35Tab: { visibilty: true },
            fitnessCertificateTab: { visibilty: true },
            xrayTab: { visibilty: true },
            foodCertificateTab: { visibilty: true },
            physicalFitnessFormTab: { visibilty: true },
            vaccinationCertificateTab: { visibilty: true },
          },
        },
        uploadReportTab: {
          visibilty: true,
          columnVisibility: { uploadReportCol: true, reportActions: true },
          childTab: {
            bloodTab: { visibilty: true },
            pftTab: { visibilty: true },
            audiometryTab: { visibilty: true },
            ecgTab: { visibilty: true },
            xrayFilmTab: { visibilty: true },
            firstAidTab: { visibilty: true },
            form21Tab: {
              getForm21Data: { visibilty: true },
              uploadForm21Data: { visibilty: true },
            },
          },
        },
        masterPdfTab: {
          visibilty: true,
          createMasterPdfBtn: { visibilty: true },
          childTab: {
            masterPdfRequestTab: { visibilty: true },
            masterPdfDownloadTab: { visibilty: true },
          },
        },
        uploadSequenceTab: { visibilty: true },
        uploadReportCloudTab: {
          visibilty: true,
          childTab: {
            uploadTab: { visibilty: true },
            allFilesTab: { visibilty: true, processReportBtn: true },
            allFilesTaskExecutor: { visibilty: true, processReportBtn: true },
          },
        },
        refreshHeadersTab: { visibilty: true },
        healthRegisterTab: { visibilty: true },
        reportAnalysis: { visibilty: true },
        packageMismatch: { visibilty: true },
        addEmpPackageDefinition: { visibilty: true },
        vitalsDataError: { visibilty: true },
      };

      break;
    case "REPORTING_OPS":
      permissions = {
        assignKamTab: { visibilty: false },
        corpAdminTab: { visibilty: false },
        bulkUploadTab: { visibilty: false },
        addPackage: { visibilty: false },
        managePermissionsTab: { visibilty: false },
        masterDataTab: { visibilty: true },
        createReportTab: {
          visibilty: true,
          createReportBtn: { visibilty: true },
          childTab: {
            form32Tab: { visibilty: true },
            form35Tab: { visibilty: true },
            fitnessCertificateTab: { visibilty: true },
            xrayTab: { visibilty: true },
            foodCertificateTab: { visibilty: true },
            physicalFitnessFormTab: { visibilty: true },
            vaccinationCertificateTab: { visibilty: true },
          },
        },
        uploadReportTab: {
          visibilty: true,
          columnVisibility: { uploadReportCol: true, reportActions: true },
          childTab: {
            bloodTab: { visibilty: true },
            pftTab: { visibilty: true },
            audiometryTab: { visibilty: true },
            ecgTab: { visibilty: true },
            xrayFilmTab: { visibilty: true },
            firstAidTab: { visibilty: true },
            form21Tab: {
              getForm21Data: { visibilty: true },
              uploadForm21Data: { visibilty: true },
            },
          },
        },
        masterPdfTab: {
          visibilty: true,
          createMasterPdfBtn: { visibilty: true },
          childTab: {
            masterPdfRequestTab: { visibilty: true },
            masterPdfDownloadTab: { visibilty: true },
          },
        },
        uploadSequenceTab: { visibilty: false },
        uploadReportCloudTab: {
          visibilty: false,
          childTab: {
            uploadTab: { visibilty: false },
            allFilesTab: { visibilty: false, processReportBtn: true },
            allFilesTaskExecutor: { visibilty: false, processReportBtn: true },
          },
        },
        refreshHeadersTab: { visibilty: false },
        healthRegisterTab: { visibilty: true },
        reportAnalysis: { visibilty: true },
        packageMismatch: { visibilty: false },
        addEmpPackageDefinition: { visibilty: false },
        vitalsDataError: { visibilty: false },
      };

      break;
    case "REPORTING":
      permissions = {
        assignKamTab: { visibilty: false },
        corpAdminTab: { visibilty: false },
        bulkUploadTab: { visibilty: false },
        addPackage: { visibilty: false },
        managePermissionsTab: { visibilty: false },
        masterDataTab: { visibilty: true },
        createReportTab: {
          visibilty: false,
          createReportBtn: { visibilty: false },
          childTab: {
            form32Tab: { visibilty: false },
            form35Tab: { visibilty: false },
            fitnessCertificateTab: { visibilty: false },
            xrayTab: { visibilty: false },
            foodCertificateTab: { visibilty: false },
            physicalFitnessFormTab: { visibilty: false },
            vaccinationCertificateTab: { visibilty: false },
          },
        },
        uploadReportTab: {
          visibilty: true,
          columnVisibility: { uploadReportCol: false, reportActions: false },
          childTab: {
            bloodTab: { visibilty: true },
            pftTab: { visibilty: true },
            audiometryTab: { visibilty: true },
            ecgTab: { visibilty: true },
            xrayFilmTab: { visibilty: true },
            firstAidTab: { visibilty: true },
            form21Tab: {
              getForm21Data: { visibilty: true },
              uploadForm21Data: { visibilty: false },
            },
          },
        },
        masterPdfTab: {
          visibilty: true,
          createMasterPdfBtn: { visibilty: true },
          childTab: {
            masterPdfRequestTab: { visibilty: true },
            masterPdfDownloadTab: { visibilty: true },
          },
        },
        uploadSequenceTab: { visibilty: false },
        uploadReportCloudTab: {
          visibilty: true,
          childTab: {
            uploadTab: { visibilty: true },
            allFilesTab: { visibilty: true, processReportBtn: false },
            allFilesTaskExecutor: { visibilty: true, processReportBtn: false },
          },
        },
        refreshHeadersTab: { visibilty: false },
        healthRegisterTab: { visibilty: true },
        reportAnalysis: { visibilty: true },
        packageMismatch: { visibilty: false },
        addEmpPackageDefinition: { visibilty: false },
        vitalsDataError: { visibilty: false },
      };

      break;
    default:
      permissions = {
        assignKamTab: { visibilty: true },
        corpAdminTab: { visibilty: true },
        bulkUploadTab: { visibilty: true },
        managePermissionsTab: { visibilty: true },
        masterDataTab: { visibilty: true },
        createReportTab: {
          visibilty: true,
          createReportBtn: { visibilty: true },
          childTab: {
            form32Tab: { visibilty: true },
            form35Tab: { visibilty: true },
            fitnessCertificateTab: { visibilty: true },
            xrayTab: { visibilty: true },
            foodCertificateTab: { visibilty: true },
            physicalFitnessFormTab: { visibilty: true },
            vaccinationCertificateTab: { visibilty: true },
          },
        },
        uploadReportTab: {
          visibilty: true,
          columnVisibility: { uploadReportCol: true, reportActions: true },
          childTab: {
            bloodTab: { visibilty: true },
            pftTab: { visibilty: true },
            audiometryTab: { visibilty: true },
            ecgTab: { visibilty: true },
            xrayFilmTab: { visibilty: true },
            firstAidTab: { visibilty: true },
            form21Tab: {
              getForm21Data: { visibilty: true },
              uploadForm21Data: { visibilty: true },
            },
          },
        },
        masterPdfTab: {
          visibilty: true,
          createMasterPdfBtn: { visibilty: true },
          childTab: {
            masterPdfRequestTab: { visibilty: true },
            masterPdfDownloadTab: { visibilty: true },
          },
        },
        uploadSequenceTab: { visibilty: true },
        uploadReportCloudTab: {
          visibilty: true,
          childTab: {
            uploadTab: { visibilty: true },
            allFilesTab: { visibilty: true, processReportBtn: true },
            allFilesTaskExecutor: { visibilty: true, processReportBtn: false },
          },
        },
        refreshHeadersTab: { visibilty: true },
        healthRegisterTab: { visibilty: true },
        reportAnalysis: { visibilty: true },
        packageMismatch: { visibilty: true },
        addEmpPackageDefinition: { visibilty: true },
        vitalsDataError: { visibilty: true },
      };
  }

  return permissions;
};
