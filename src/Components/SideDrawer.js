import { useState } from "react";
import { Box, Tooltip, Button } from "@chakra-ui/react";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  return (
    <div>
      <Box>
        <Tooltip label="Search Users to Chat" hasArrow bg="red.600">
          <Button>Button</Button>
        </Tooltip>
      </Box>
    </div>
  );
};

export default SideDrawer;
