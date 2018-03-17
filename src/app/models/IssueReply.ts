import User from 'app/models/User';

export default class IssueReply{
	description: string;
	from: User;
	postedOn: Date;
}