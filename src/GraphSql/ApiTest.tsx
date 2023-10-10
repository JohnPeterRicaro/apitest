import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

const GET_MATTERTAGS_QUERY = `
query getData($modelId: ID!) {
  model(id: $modelId) {
    id
    name
    modified
    mattertags(includeDisabled: true) {
      id
      floor {
        id
      }
      label
      modified
    }
    image{
      snapshotLocation{
				position {x,y,z}
				anchor {
					id
					tags
					label
					panoImageVariants
				}
			}
    }
		activeHighlightReel{
			label
			__typename
		}
		highlightReels {
			id
      label
			modified
      reel {
				id
				__typename
				asset{
					__typename
				}
			}
		}   
  }
}
`;

const API_URL = "https://api.matterport.com/api/models/graph";

const ApiTest: React.FC = () => {
  const tokenID = "9b3212de1b1198d4";
  const tokenSecret = "5f2b6c45b2e7f2dc46ca2f2e8bc22ec8";

  const fetchData = async () => {
    const response: AxiosResponse = await axios.post(
      API_URL,
      //
      { query: GET_MATTERTAGS_QUERY, variables: { modelId: "FM3AC4ePrXF" } },
      {
        auth: {
          username: `${tokenID}`,
          password: `${tokenSecret}`,
        },
      }
    );

    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery(
    ["matterportData"],
    fetchData
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div className="mx-auto w-[500px]">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export { ApiTest };
