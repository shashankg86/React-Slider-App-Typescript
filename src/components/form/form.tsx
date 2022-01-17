import React from "react";
import { Form, Navbar, Container } from "react-bootstrap";
import { Logo, TextInput } from "vcc-ui";

type FilterFormState = {
  text: string;
};

type IProps = {
  onFilter: any;
};
class FilterForm extends React.Component<IProps, FilterFormState> {
  state: FilterFormState = {
    text: "",
  };

  private onChange = async (e: React.FormEvent<HTMLInputElement>) => {
     this.props.onFilter(e.currentTarget.value);
     this.setState({ text: e.currentTarget.value });
  };
  render() {
    return (
      <Container>
        <Navbar>
          <Container>
            <Navbar.Brand href="#home">
              <Logo type="spreadmark" height={22} />
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <h5 className="text-dark font-weight-bold mt-2">Our Cars</h5>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Form>
          <Form.Group className="mb-3">
            <TextInput placeholder="Filter Cars by Body Type" value={this.state.text} onChange={this.onChange} />
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

export default FilterForm;
