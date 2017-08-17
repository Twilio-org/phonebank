const tableInfo = {
  campaigns: {
    headers: ['Name', 'Title', 'Description', 'Status', 'Script Id', 'Contact List', 'Date Created'],
    redirect_path: '/admin/campaigns/new'
  },
  scripts: {
    headers: ['Name', 'Body', 'Description', 'Created At', 'Updated At'],
    redirect_path: '/admin/scripts/new'
  },
  questions: {
    headers: [['Title', 'title'], ['Description', 'description'], ['Type', 'type'], ['Response Options', 'responses'], ['Created At', 'created_at'], ['Updated At', 'updated_at']],
    redirect_path: '/admin/questions/new'
  }
};

export default tableInfo;

