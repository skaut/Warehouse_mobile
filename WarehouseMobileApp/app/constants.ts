import {HttpHeaders, HttpParams} from "@angular/common/http";

const TEST_IS = true;

export const SERVER_URL = TEST_IS ? "https://test-is.skaut.cz/" : "https://is.skaut.cz/";
export const BASE_SERVICE_URL = SERVER_URL + "JunakWebservice/"

// todo - fill in appid for production once received
export const APPLICATION_ID = TEST_IS ? "cd5f12c7-4fde-481a-9fbb-b167b1d33152" : "";

export const BUTTON_LOGIN = "Přihlásit se";

export const USER_TOKEN = "token";
export const USER_ROLE_ID = "roleId";
export const USER_UNIT_ID = "unitId";
export const USER_ID = "userId";
export const USER_PERSON_ID = "userPersonId";
export const USER_PERSON_NAME = "userPersonName";
export const USER_ROLE = "userRole"
export const USER_NAME = "userName";

export const ALLOWED_ROLES = ["18", "22", "25", "44", "50", "51", "61", "103", "104"];

/**
 * The three constants below are hidden inputs in SkautIS web page (test and production respectively).
 * It is necessary to send these values along with user name and password for successful login.
 * EDIT: It seems that __VIEWSTATEGENERATOR is not necessary to send.
 */
export const __EVENTVALIDATION = TEST_IS
    ? "/wEdAAbUPcsB8lZt0eubI3qrQasyDWTlVFFJ9YJcCdgyvbvSZJjc8X/OeYsNy9+KgXIoSOZMlO+KuBJDgBNV3/T8Jw9hbOt01hIqJPnLi/Gc3NzATMPVWCNOPgGxUCfc4D95At/dLp2PV0JbIeul+0/lTDizSHayNAuvr7ygzBWG/V354g=="
    : "/wEdAAb7NRfLg6TI0sjimF8xsRLJDWTlVFFJ9YJcCdgyvbvSZJjc8X/OeYsNy9+KgXIoSOZMlO+KuBJDgBNV3/T8Jw9hbOt01hIqJPnLi/Gc3NzATMPVWCNOPgGxUCfc4D95At+RdHEEuZM+PBm9eoUh3p7kp7bwrsDYZ/A0BeFQBb2LrQ==";

export const __VIEWSTATEGENERATOR = "659C1D5D";

export const __VIEWSTATE = TEST_IS
    ? "/wEPDwUKMTQ5OTgxNjA5OQ9kFgJmD2QWBAIBD2QWAgIIDxYCHgRocmVmBRkvTG9naW4vRmF2aWNvbnMvanVuYWsuaWNvZAIDD2QWBAICDxYCHglpbm5lcmh0bWwFGHNrYXV0SVMgKFRFU1RPVkFDJiMyMDU7KWQCAw9kFgQCBQ8PFgIeBE1vZGULKWhKdW5hay5VdGlscy5Db250cm9scy5Gb3JtTW9kZSwgSnVuYWsuVXRpbHMsIFZlcnNpb249MS4wLjY1OTEuMjkyNjQsIEN1bHR1cmU9bmV1dHJhbCwgUHVibGljS2V5VG9rZW49bnVsbABkFggCAQ8PFgQeCENzc0NsYXNzBRlmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sHgRfIVNCAgJkZAIDDw8WBB8DBRlmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sHwQCAmRkAgUPFgIeB1Zpc2libGVoZAIHD2QWAgIBDw8WBh8DBQ9idG4gYnRuLXByaW1hcnkeBEljb24FDWZhIGZhLXNpZ24taW4fBAICZGQCCA9kFgICAQ8WAh8FaGRkDq+ghP4oBZUjuPr16eO3aF+1RA6sRMp5wpagYadzuXE="
    : "/wEPDwUKMTQ5OTgxNjA5OQ9kFgJmD2QWBAIBD2QWAgIIDxYCHgRocmVmBRkvTG9naW4vRmF2aWNvbnMvanVuYWsuaWNvZAIDD2QWBAICDxYCHglpbm5lcmh0bWwFC3NrYXV0SVMgd2ViZAIDD2QWBAIFDw8WAh4ETW9kZQspaEp1bmFrLlV0aWxzLkNvbnRyb2xzLkZvcm1Nb2RlLCBKdW5hay5VdGlscywgVmVyc2lvbj0xLjAuNjU5MS4yOTI2NCwgQ3VsdHVyZT1uZXV0cmFsLCBQdWJsaWNLZXlUb2tlbj1udWxsAGQWCAIBDw8WBB4IQ3NzQ2xhc3MFGWZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2weBF8hU0ICAmRkAgMPDxYEHwMFGWZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wfBAICZGQCBQ8WAh4HVmlzaWJsZWhkAgcPZBYCAgEPDxYGHwMFD2J0biBidG4tcHJpbWFyeR4ESWNvbgUNZmEgZmEtc2lnbi1pbh8EAgJkZAIID2QWAgIBDxYCHwVoZGRS5i5zMsWdUgf+fUgb2+2PYu5mNWcM2317Dl12w2g0iA==";
