import { CommandInteraction, Permissions  } from "discord.js";
import { DB_COMMANDS } from "./postgresConnections";

export const allowsEdit = async (interaction: CommandInteraction, userId?: string): Promise<boolean> => {
    const memberId = interaction.member.user.id;

    const members = await DB_COMMANDS.listElevatedMembers(interaction.guildId);

    const userHasElevatedPermissions = interaction.memberPermissions.has(Permissions.FLAGS.MANAGE_GUILD) || members.filter(elevated => elevated.user_id === memberId).length > 0;
    if(!userHasElevatedPermissions && memberId !== userId){
       return false;
    }
    return true;
}