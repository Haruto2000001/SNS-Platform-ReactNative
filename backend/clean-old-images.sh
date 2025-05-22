#!/usr/bin/env bash

# Removes older duplicate Docker images for a specified repository prefix.

REPO_PREFIX="public.ecr.aws/supabase/"

# Get all images for the prefix, sort by repo and date (newest first), skip the first per repo (latest), keep duplicates
OLDER_IMAGE_IDS=$(docker images --format '{{.Repository}}\t{{.ID}}\t{{.CreatedAt}}' |
  grep "^$REPO_PREFIX" |
  sort -t $'\t' -k1,1 -k3,3r |
  awk -F'\t' 'seen[$1]++ { print $2 }')

# Exit early if nothing to delete
[ -z "$OLDER_IMAGE_IDS" ] && {
  echo "No older duplicate images found for '$REPO_PREFIX'."
  exit 0
}

# Show and delete older image IDs
echo "Removing the following older duplicate image IDs for '$REPO_PREFIX':"
for id in $OLDER_IMAGE_IDS; do
  info=$(docker image inspect --format "{{.RepoTags}}" $id)
  printf "  %-15s - %s\n" "$id" "$info"
done

echo "---"
echo "Executing removal..."
if echo "$OLDER_IMAGE_IDS" | xargs --no-run-if-empty docker rmi; then
  echo "Removal completed successfully."
else
  echo "Error occurred during image removal." >&2
  exit 1
fi

exit 0


