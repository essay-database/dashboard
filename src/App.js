import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import getData, { columns, years, statuses, countries, states } from "./data";

const truncate = text => text.substring(0, 20) + "...";

const convertToObj = (props, values) =>
  props.reduce(
    (acc, curr, idx) => Object.assign(acc, { [curr]: values[idx] }),
    {}
  );

class App extends PureComponent {
  state = {
    open: false,
    data: [],
    id: null,
    essay: null,
    prompt: null,
    college: null,
    year: null,
    status: null,
    name: null,
    email: null,
    country: null,
    state: null,
    featured: null,
    image: null,
    date: null,
    source: null,
    comments: null,
    views: null
  };

  onRowClick = (_, { dataIndex }) => {
    const data = convertToObj(columns, this.state.data[dataIndex]);
    data.featured = Boolean(data.featured);
    this.setState({
      open: true,
      ...data
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSave = () => {
    this.handleClose();
  };

  handleChangeToggle = name => e => {
    this.setState({ [name]: e.target.checked });
  };

  handleChangeText = name => e => {
    this.setState({ [name]: e.target.value });
  };

  componentDidMount = () => {
    this.setState({
      data: getData(69)
    });
  };

  render() {
    const options = {
      filterType: "dropdown",
      responsive: "scroll",
      onRowClick: this.onRowClick
    };
    const {
      data,
      open,
      id,
      essay,
      prompt,
      college,
      year,
      status,
      name,
      email,
      country,
      state,
      featured,
      image,
      date,
      source,
      comments,
      views
    } = this.state;
    const { classes } = this.props;
    return (
      <>
        <MUIDataTable
          title="Essays Dashboard"
          data={data}
          columns={columns}
          options={options}
        />
        <Dialog open={open} onClose={this.handleClose} fullWidth maxWidth="lg">
          <DialogTitle>Edit Essay</DialogTitle>
          <DialogContent>
            <form>
              <fieldset>
                <legend>Essay</legend>
                <TextField
                  onChange={this.handleChangeText("essay")}
                  label="essay"
                  type="text"
                  value={essay}
                  multiline
                  rows={10}
                  required
                  fullWidth
                />
                <TextField
                  onChange={this.handleChangeText("prompt")}
                  label="prompt"
                  type="text"
                  value={prompt}
                  multiline
                  rows={2}
                  required
                  fullWidth
                />
                {/* TODO autocomplete/dropdown ? */}
                <TextField
                  onChange={this.handleChangeText("college")}
                  label="college"
                  type="text"
                  value={college}
                  required
                  fullWidth
                />
                <FormControl className={classes.formControl} required>
                  <InputLabel>Year</InputLabel>
                  <Select value={year} onChange={this.handleChangeText("year")}>
                    {years.map((year, idx) => (
                      <MenuItem key={idx} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl} required>
                  <InputLabel>status</InputLabel>
                  <Select
                    value={status}
                    onChange={this.handleChangeText("status")}
                  >
                    {statuses.map((status, idx) => (
                      <MenuItem key={idx} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </fieldset>
              <fieldset>
                <legend>Author</legend>
                <TextField
                  onChange={this.handleChangeText("name")}
                  label="name"
                  type="text"
                  value={name}
                  required
                  fullWidth
                />
                <TextField
                  label="email"
                  type="email"
                  value={email}
                  disabled
                  fullWidth
                />
                <FormControl className={classes.formControl} required>
                  <InputLabel>country</InputLabel>
                  <Select
                    value={country}
                    onChange={this.handleChangeText("country")}
                  >
                    {countries.map((country, idx) => (
                      <MenuItem key={idx} value={country}>
                        {country}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl} required>
                  <InputLabel>state</InputLabel>
                  <Select
                    value={state}
                    onChange={this.handleChangeText("state")}
                  >
                    {states.map((state, idx) => (
                      <MenuItem key={idx} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </fieldset>
              <fieldset>
                <legend>Meta</legend>
                <TextField
                  label="id"
                  type="text"
                  value={id}
                  required
                  fullWidth
                  disabled
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={featured}
                      onChange={this.handleChangeToggle("featured")}
                      value={featured}
                      color="primary"
                    />
                  }
                  label="featured"
                />
                <TextField
                  onChange={this.handleChangeText("image")}
                  label="image"
                  type="number"
                  value={image}
                  required
                  fullWidth
                />
                <TextField
                  label="date"
                  type="text"
                  value={date}
                  disabled
                  fullWidth
                />
                <TextField
                  onChange={this.handleChangeText("source")}
                  label="source"
                  type="url"
                  value={source}
                  required
                  fullWidth
                />
                <TextField
                  onChange={this.handleChangeText("comments")}
                  label="comments"
                  type="text"
                  value={comments}
                  fullWidth
                  multiline
                  rows={2}
                  required
                />
                <TextField
                  label="views"
                  type="number"
                  value={views}
                  fullWidth
                  disabled
                />
              </fieldset>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} className={classes.cancel}>
              Cancel
            </Button>
            <Button onClick={this.handleSave} color="primary">
              save
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  cancel: {
    color: "#757575"
  }
});

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
