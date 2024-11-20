import formidable from 'formidable';

async function importData (req: any, res: any) {
  console.log("called")
    const form = formidable({});

    form.parse(req, (err, fields, files) => {
      if (err) {
        return;
      }
      res.json({ fields, files });
    });
}

export default importData;