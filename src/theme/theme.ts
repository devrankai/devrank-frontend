import { esES as coreEsES } from "@mui/material/locale";
import { createTheme } from "@mui/material/styles";
import { esES as gridEsES } from "@mui/x-data-grid";

declare module "@mui/material/styles" {
  interface Palette {
    primaryWhite: string;
    primaryBlack: string;
    primaryBackground2: string;
  }

  interface PaletteOptions {
    primaryWhite: string;
    primaryBlack: string;
    primaryBackground2: string;
  }
}

export interface CustomStyleProps {
  primaryBlack?: string;
  primaryBackground2?: string;
  primaryWhite?: string;
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    anchor: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    anchor?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    anchor: true;
  }
}

export const devRank = createTheme(
  {
    palette: {
      primaryWhite: "#FFFFFF",
      primaryBlack: "#333333",
      primaryBackground2: "#F1F2FA",
      primary: {
        main: "#0067CA",
      },
      secondary: {
        main: "#DF3045",
      },
      error: {
        main: "#CD1812",
      },
      warning: {
        main: "#FFBA33",
      },
      success: {
        main: "#1C8747",
      },
      grey: {
        "900": "#1E1E1E",
      },
      text: {
        primary: "#1E1E1E",
      },
    },
    typography: {
      fontFamily: "Poppins, sans-serif",
      h1: {
        fontSize: "27.29px",
        lineHeight: "40.93px",
        fontWeight: 500,
      },
      h2: {
        fontSize: "22px",
        lineHeight: "32px",
        fontWeight: 700,
      },
      h3: {
        fontSize: "18px",
        lineHeight: "24px",
        fontWeight: 700,
      },
      h4: {
        fontSize: "18px",
        lineHeight: "24px",
        fontWeight: 700,
      },
      h5: {
        fontSize: "15px",
        lineHeight: "21px",
        fontWeight: 600,
      },
      body1: {
        fontFamily: "Poppins, sans-serif",
        fontSize: "13.64px",
        lineHeight: "20.47px",
        fontWeight: 400,
      },
      body2: {
        fontFamily: "Poppins, sans-serif",
        fontSize: "13px",
        lineHeight: "15px",
        fontWeight: 600,
      },
      caption: {
        fontFamily: "Poppins, sans-serif",
        fontSize: "11px",
        lineHeight: "15px",
        fontWeight: 600,
      },
      button: {
        fontSize: "15px",
        lineHeight: "21px",
        fontWeight: 700,
        textTransform: "none",
      },
      anchor: {
        fontSize: "13px",
        fontWeight: 700,
        color: "#1226AA",
        textDecoration: "underline",
      },
    },
    components: {
      MuiMenuItem: {
        styleOverrides: {
          root: {
            marginBottom: "12px",
            ":hover": {
              color: "#2A5E90",
            },
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          bar: {
            backgroundColor: "#172554",
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: "filled",
        },
        styleOverrides: {
          root: {
            input: {
              "&[type=number]": {
                MozAppearance: "textfield",
              },
              "&::-webkit-outer-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
              "&::-webkit-inner-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
            },
            "& .MuiFormLabel-root": {
              top: "-28px",
              left: "-13px",
              fontWeight: "600",
              fontSize: "12px",
              lineHeight: "18px",
              color: "#1E1E1E",
            },
          },
        },
      },
      MuiStack: {
        styleOverrides: {
          root: {
            paddingTop: "20px !important",
          },
        },
      },
      MuiInputLabel: {
        defaultProps: {
          shrink: true,
        },
        styleOverrides: {
          root: {
            top: "-10px",
            left: "-13px",
            "&.Mui-error": {
              color: "black",
            },
            "&.Mui-focused": {
              color: "black",
            },
          },
        },
      },
      MuiFilledInput: {
        defaultProps: {
          disableUnderline: true,
          size: "small",
        },
        styleOverrides: {
          root: ({ theme }) => ({
            border: "1px solid #1A73E8",
            overflow: "hidden",
            backgroundColor: "#FFFFFF",
            borderRadius: 4,
            transition: theme.transitions.create([
              "border-color",
              "background-color",
              "box-shadow",
            ]),
            ":hover": {
              backgroundColor: "#FFFFFF",
            },
            "&.Mui-error": {
              borderColor: "#CD1812",
            },
          }),
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            width: "100%",
          },
        },
      },
      MuiSelect: {
        defaultProps: {
          variant: "filled",
        },
      },
      MuiButton: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            borderRadius: "6.19px",
            fontStyle: "normal",
            fontSize: "16px",
            padding: "13px 20px",
          },
          text: {
            "&.Mui-focusVisible": {
              backgroundColor: "#BFBFBF",
            },
            ":hover": {
              backgroundColor: "#BFBFBF",
            },
          },
          outlined: {
            border: "2px solid",
            ":hover": {
              border: "2px solid",
              background: "rgba(18, 38, 170, 0.1)",
            },
            ":focus": {
              color: "white",
              background: "#1226AA",
            },
            "&.Mui-disabled": {
              border: "2px solid #8F9193",
              color: "#8F9193",
            },
          },
          containedPrimary: {
            background: "#0067CA",
            ":hover": {
              backgroundColor:
                "linear-gradient(270deg, #1226AA 0%, #121A52 103.21%)",
            },
            ":focus": {
              backgroundColor: "#121A52",
            },
            "&.Mui-disabled": {
              background: "#8F9193",
              color: "white",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: "none",
            borderRadius: 0,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "15px",
            lineHeight: "21px",
            color: "#202327",
            textAlign: "left",
            borderBottom: "none",
          },
          head: {
            color: "#555555",
            fontSize: "13px",
            lineHeight: "15px",
            fontFamily: "Poppins, sans-serif",
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            ":nth-of-type(odd)": {
              background: "rgba(231,233,247,0.4)",
            },
          },
          head: {
            backgroundColor: "#fff !important",
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: ({ theme }) => ({
            width: 32,
            height: 18,
            padding: 0,
            display: "flex",
            ":active": {
              "& .MuiSwitch-thumb": {
                width: 15,
              },
            },
            "& .MuiSwitch-switchBase.Mui-checked": {
              transform: "translateX(14px) !important",
            },
            "& .MuiSwitch-switchBase": {
              padding: 2,
              "&.Mui-checked": {
                transform: "translateX(12px)",
                color: "#fff",
                "& + .MuiSwitch-track": {
                  opacity: 1,
                  backgroundColor: theme.palette.primary.main,
                },
              },
            },
            "& .Mui-focusVisible": {
              backgroundColor: "#1226AA",
              color: "#F1F2FA",
            },
            "& .Mui-checked.Mui-focusVisible": {
              backgroundColor: "black",
              color: "white",
            },
            "& .MuiSwitch-thumb": {
              boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
              width: 14,
              height: 14,
              borderRadius: 6,
              transition: theme.transitions.create(["width"], {
                duration: 200,
              }),
            },
            "& .MuiSwitch-track": {
              borderRadius: 16 / 2,
              opacity: 1,
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,.35)"
                  : "rgba(0,0,0,.25)",
              boxSizing: "border-box",
              ".Mui-checked.Mui-checked + &": {
                opacity: 0.1,
                backgroundColor: "#fff",
              },
            },
          }),
        },
      },
      MuiTypography: {
        styleOverrides: {
          //@ts-expect-error NO error
          anchor: {
            ":hover": {
              cursor: "pointer",
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: "8px",
          },
        },
      },
      MuiSnackbar: {
        styleOverrides: {
          root: ({ theme }) => ({
            "& .MuiSnackbarContent-root": {
              padding: "1em",
              fontSize: "15px",
              lineHeight: "17px",
              color: "black",
              backgroundColor: theme.palette.primaryBackground2,
            },
          }),
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            "& .MuiAlert-action": {
              padding: "0 0 0 10px",
              margin: 0,
            },
            width: "100%",
            maxWidth: "350px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          root: {
            "& .MuiInputBase-root": {
              border: "1px solid #1A73E8",
              borderRadius: "4px",
            },
            "& .MuiFormLabel-root": {
              top: "-26px",
              fontWeight: "600",
              fontSize: "12px",
              lineHeight: "18px",
              color: "#1E1E1E",
            },
          },
        },
        defaultProps: {
          componentsProps: {
            popper: {
              sx: {
                height: 0,
              },
            },
            paper: {
              sx: {
                width: "max-content",
              },
            },
          },
        },
      },
      MuiDatePicker: {
        defaultProps: {
          PopperProps: {
            sx: {
              height: 0,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          colorPrimary: ({ theme }) => ({
            background: theme.palette.primaryBackground2,
            borderRadius: "8px",
            fontSize: "9px",
            fontWeight: 700,
            color: theme.palette.primary.main,
          }),
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: " #E8E8E8",
            borderWidth: "2px",
          },
        },
      },
    },
  },
  gridEsES,
  coreEsES
);
