import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import { GET_CHARACTER } from "../gql/rickAndMortyGQL";
import {
  BackButton,
  CharacterImage,
  CharacterName,
  ChipsContainer,
  EpisodesPaper,
  EpisodeToggle,
  ImageGridContainer,
  InfoContainer,
  InfoFieldBox,
  PageContainer,
  StatusBox,
} from "../styled/pages/CharacterDetailPage.styled";
import type { CharacterDetailData } from "../types/rickAndMortyTypes";

export default function CharacterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showEpisodes, setShowEpisodes] = useState(false);

  const { loading, error, data } = useQuery<CharacterDetailData>(
    GET_CHARACTER,
    {
      variables: { id },
    }
  );

  if (loading || error) {
    return (
      <StatusBox>
        {loading ? (
          <CircularProgress />
        ) : (
          <Alert severity="error">Error: {error?.message}</Alert>
        )}
      </StatusBox>
    );
  }

  if (!data?.character) return null;

  const character = data.character;

  return (
    <PageContainer>
      <BackButton>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
          Back to Characters
        </Button>
      </BackButton>

      <Card>
        <ImageGridContainer>
          <CharacterImage src={character.image} alt={character.name} />

          <CardContent>
            <CharacterName variant="h3">{character.name}</CharacterName>

            <ChipsContainer>
              <Chip
                label={character.status}
                color={
                  character.status === "Alive"
                    ? "success"
                    : character.status === "Dead"
                    ? "error"
                    : "default"
                }
              />
              <Chip label={character.species} variant="outlined" />
              <Chip label={character.gender} variant="outlined" />
            </ChipsContainer>

            <InfoContainer>
              <InfoField label="Species" value={character.species} />

              {character.type && (
                <InfoField label="Type" value={character.type} />
              )}

              <InfoField label="Gender" value={character.gender} />

              <InfoField label="Origin" value={character.origin.name} />

              <InfoField
                label="Last Known Location"
                value={character.location.name}
              />

              {character.episode && character.episode.length > 0 && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Episode Appearances
                  </Typography>
                  <EpisodeToggle onClick={() => setShowEpisodes(!showEpisodes)}>
                    <Typography variant="body1">
                      {character.episode.length} episodes
                    </Typography>
                    {showEpisodes ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </EpisodeToggle>
                </Box>
              )}
            </InfoContainer>
          </CardContent>
        </ImageGridContainer>
      </Card>

      {character.episode && character.episode.length > 0 && (
        <Collapse in={showEpisodes}>
          <EpisodesPaper>
            <List>
              {character.episode.map((ep) => (
                <ListItem
                  key={ep.id}
                  sx={{
                    py: 1,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    "&:last-child": {
                      borderBottom: "none",
                    },
                  }}
                >
                  <ListItemText primary={ep.name} secondary={ep.episode} />
                </ListItem>
              ))}
            </List>
          </EpisodesPaper>
        </Collapse>
      )}
    </PageContainer>
  );
}

function InfoField({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <InfoFieldBox>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </InfoFieldBox>
  );
}
