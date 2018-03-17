import IssueReply from 'app/models/IssueReply';

export default class Issue{
	id: string;
	title: string;
	description: string;
	username: string;
	reponame: string;
	labels: any[];
	open: boolean;
	replies: IssueReply[];
}