import { useQuery } from "@apollo/client/react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

import Alert from "@mui/material/Alert";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";

import CircularProgress from "@mui/material/CircularProgress";
import { GET_CHARACTERS } from "../gql/rickAndMortyGQL";
import {
  CharacterCard,
  CharacterContent,
  CharacterContentName,
  CharacterImage,
  CharacterInfoFieldText,
  CharactersGrid,
  NoCharactersBox,
  PageContainer,
  PageHeading,
  PaginationBox,
  StatusBox,
} from "../styled/pages/RickAndMortyPage.styled";
import type { CharactersData } from "../types/rickAndMortyTypes";

export default function RickAndMortyPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentPage = Number(searchParams.get("page")) || 1;

  const { loading, error, data } = useQuery<CharactersData>(GET_CHARACTERS, {
    variables: { page: currentPage },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return null;

  const characters = data.characters.results;
  const info = data.characters.info;

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setSearchParams({ page: page.toString() });
  };

  if (loading || error) {
    return (
      <StatusBox>
        {loading ? (
          <CircularProgress />
        ) : (
          <Alert severity="error">Error: {error}</Alert>
        )}
      </StatusBox>
    );
  }

  return (
    <PageContainer>
      <PageHeading variant="h3">
        Rick and Morty Characters (GraphQL)
      </PageHeading>
      {characters.length && (
        <CharactersGrid>
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              onClick={() => navigate(`/character/${character.id}`)}
            >
              <CharacterImage src={character.image} alt={character.name} />
              <CharacterContent>
                <CharacterContentName variant="h5">
                  {character.name}
                </CharacterContentName>
                <CharacterInfoField label="Status" value={character.status} />
                <CharacterInfoField label="Species" value={character.species} />
                <CharacterInfoField label="Gender" value={character.gender} />
                <CharacterInfoField
                  label="Origin"
                  value={character.origin.name}
                />
                <CharacterInfoField
                  label="Location"
                  value={character.location.name}
                />
              </CharacterContent>
            </CharacterCard>
          ))}
        </CharactersGrid>
      )}
      {!loading && characters.length === 0 && !error && (
        <NoCharactersBox>
          <Typography variant="h6" color="text.secondary">
            No characters found
          </Typography>
        </NoCharactersBox>
      )}
      {/* Pagination */}
      {info && info.pages > 1 && (
        <PaginationBox>
          <Pagination
            count={info.pages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </PaginationBox>
      )}
    </PageContainer>
  );
}

function CharacterInfoField({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <CharacterInfoFieldText variant="body2">
      <strong>{label}:</strong> {value}
    </CharacterInfoFieldText>
  );
}
