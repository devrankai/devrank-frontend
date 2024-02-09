import { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { Candidate } from "./components/Candidate";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// function a11yProps(index: number) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

type BasicTabsProps = {
  candidatesId: number[];
};

export const BasicTabs: React.FC<BasicTabsProps> = ({ candidatesId }) => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", mt: 3 }}>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          scrollButtons
          allowScrollButtonsMobile
          variant="scrollable"
        >
          {candidatesId?.map((candidate, index) => (
            <Tab
              key={`Candidate ${candidate}`}
              label={`Candidate ${index}`}
              // {...a11yProps(index)}
              id={`simple-tab-${index}`}
              aria-controls={`simple-tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Box>
      {candidatesId?.map((candidate, index) => (
        <CustomTabPanel
          key={`tab-panel-${candidate}`}
          value={value}
          index={index}
        >
          <Candidate candidateId={candidate} />
        </CustomTabPanel>
      ))}
    </Box>
  );
};
