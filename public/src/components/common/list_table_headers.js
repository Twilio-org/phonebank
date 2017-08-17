const tableInfo = {
  campaigns: {
    headers: [['Name', 'name'], ['Title', 'title'], ['Description', 'description'], ['Status', 'status'], ['Script Id', 'script_id'], ['Contact List', 'contact_lists_id'], ['Date Created', 'created_at']],
    redirect_path: '/admin/campaigns/new'
  },
  scripts: {
    headers: [['Name', 'name'], ['Body', 'body'], ['Description', 'created_at'], ['Created At', 'created_at'], ['Updated At', 'updated_at']],
    redirect_path: '/admin/scripts/new'
  },
  questions: {
    headers: [['Title', 'title'], ['Description', 'description'], ['Type', 'type'], ['Response Options', 'responses'], ['Created At', 'created_at'], ['Updated At', 'updated_at']],
    redirect_path: '/admin/questions/new'
  }
};

export default tableInfo;

