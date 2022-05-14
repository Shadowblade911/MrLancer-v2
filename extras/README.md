# Some Extras

This folder contains some extra ancillary files that are useful when deploying
MrLancer, but aren't part of the bot itself.

- `backup-lancer`: a backup script that:
  - Dumps the PostgreSQL database to a local folder
  - Pushes those local backups to a restic repository
  - Emits pushover notifications when applicable
- `backup-lancer.service`: a systemd unit to run the above script
- `backup-lancer.timer`: a systemd timer to run the above unit daily
